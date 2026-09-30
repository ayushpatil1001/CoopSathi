import os
import base64
import requests
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

# LangChain Imports for Orchestration & LLaMA 3
from langchain_groq import ChatGroq
from langchain_community.vectorstores import SupabaseVectorStore
from langchain_huggingface import HuggingFaceEmbeddings
from supabase.client import create_client, Client
from langchain.chains import RetrievalQA

app = FastAPI(title="CoopSathi AI", description="Supabase + LangChain + LLaMA 3 + Bhashini API")

# Strict CORS Whitelist for Frontend (https://coopsathi.vercel.app)
allowed_origins_env = os.environ.get("ALLOWED_ORIGINS", "https://coopsathi.vercel.app")
allowed_origins = [orig.strip().rstrip("/") for orig in allowed_origins_env.split(",") if orig.strip()]
if os.environ.get("ENV", "development") != "production":
    allowed_origins.extend(["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# ==========================================
# 1. Database: Supabase (Structured + Vector)
# ==========================================
SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://your-project.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "your-anon-key")
supabase_client: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ==========================================
# 2. AI Orchestration: LangChain
# ==========================================
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vector_store = SupabaseVectorStore(
    client=supabase_client,
    embedding=embeddings,
    table_name="documents",
    query_name="match_documents"
)

# ==========================================
# 3. LLM: LLaMA 3 (via Groq API for speed)
# ==========================================
# Using LLaMA 3 8B model natively
llm = ChatGroq(
    model_name="llama3-8b-8192", 
    temperature=0.3,
    api_key=os.environ.get("GROQ_API_KEY", "mock-groq-key")
)

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vector_store.as_retriever(search_kwargs={"k": 3})
)

# ==========================================
# 4. Translation & Voice: Bhashini API
# ==========================================
class BhashiniVoiceService:
    def __init__(self):
        # Users register on Bhashini (Udyat / ULCA) to get UserID, Udyat Key, and Inference Key
        self.user_id = os.environ.get("BHASHINI_USER_ID", "")
        self.udyat_key = os.environ.get("BHASHINI_UDYAT_KEY", "")
        self.inference_key = os.environ.get("BHASHINI_INFERENCE_KEY", "") or os.environ.get("BHASHINI_API_KEY", "")
        self.compute_url = "https://dhruva-api.bhashini.gov.in/services/inference/pipeline"
        self.auth_url = "https://dhruva-api.bhashini.gov.in/services/auth/pipeline"

    def _get_headers(self):
        return {
            "Authorization": self.inference_key,
            "Content-Type": "application/json"
        }

    def speech_to_text(self, audio_base64: str, source_lang: str) -> str:
        """Uses Bhashini ASR (Automatic Speech Recognition)"""
        if not self.inference_key:
            print("[Mock] Bhashini ASR: Translating Hindi Audio to Text")
            return "kya schemes available hain?" # Mock output
            
        payload = {
            "pipelineTasks": [{"taskType": "asr"}],
            "inputData": {
                "audio": [{"audioContent": audio_base64}],
                "sourceLanguage": source_lang
            }
        }
        # Real Bhashini API call
        response = requests.post(self.compute_url, headers=self._get_headers(), json=payload, timeout=10)
        response.raise_for_status()
        return response.json()["pipelineResponse"][0]["output"][0]["source"]

    def text_to_speech(self, text: str, target_lang: str) -> str:
        """Uses Bhashini TTS (Text to Speech)"""
        if not self.inference_key:
            print(f"[Mock] Bhashini TTS: Generating audio for -> {text}")
            return "base64_encoded_audio_string" # Mock output

        payload = {
            "pipelineTasks": [{"taskType": "tts"}],
            "inputData": {
                "input": [{"source": text}],
                "sourceLanguage": target_lang
            }
        }
        response = requests.post(self.compute_url, headers=self._get_headers(), json=payload, timeout=10)
        response.raise_for_status()
        return response.json()["pipelineResponse"][0]["audio"][0]["audioContent"]

    def translate_text(self, text: str, source_lang: str, target_lang: str) -> str:
        """Uses Bhashini NMT (Translation) to translate between Indian languages and English"""
        if not self.inference_key or source_lang == target_lang:
            return text

        payload = {
            "pipelineTasks": [{
                "taskType": "translation",
                "config": {
                    "language": {
                        "sourceLanguage": source_lang,
                        "targetLanguage": target_lang
                    }
                }
            }],
            "inputData": {
                "input": [{"source": text}]
            }
        }
        try:
            response = requests.post(self.compute_url, headers=self._get_headers(), json=payload, timeout=10)
            response.raise_for_status()
            return response.json()["pipelineResponse"][0]["output"][0]["target"]
        except Exception as e:
            print(f"[Warning] Bhashini translation error: {e}")
            return text

bhashini = BhashiniVoiceService()

# API Models
class ChatRequest(BaseModel):
    query: str
    language: str = "en"

class ChatResponse(BaseModel):
    response: str
    audio_base64: Optional[str] = None
    language: str

@app.post("/api/chat", response_model=ChatResponse)
async def text_chat_endpoint(request: ChatRequest):
    try:
        # 1. RAG Pipeline with LLaMA 3
        try:
            answer = qa_chain.run(request.query)
        except Exception as e:
            answer = f"Hello! LLaMA 3 is ready. (Set GROQ_API_KEY to activate inference). Query: {request.query}"
            
        # 2. Bhashini TTS: Generate voice for the response
        audio_b64 = bhashini.text_to_speech(answer, request.language)
            
        return ChatResponse(
            response=answer, 
            audio_base64=audio_b64, 
            language=request.language
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/voice-chat", response_model=ChatResponse)
async def voice_chat_endpoint(language: str, file: UploadFile = File(...)):
    """Accepts a voice file, uses Bhashini for STT, LLaMA 3 for RAG, and Bhashini for TTS"""
    try:
        # Read audio file and convert to base64
        audio_bytes = await file.read()
        audio_b64 = base64.b64encode(audio_bytes).decode('utf-8')
        
        # 1. Bhashini STT (Speech to Text)
        user_text = bhashini.speech_to_text(audio_b64, language)
        
        # 2. LangChain + LLaMA 3 + Supabase RAG
        try:
            answer = qa_chain.run(user_text)
        except Exception:
            answer = f"Hello! LLaMA 3 heard: {user_text}. (Set GROQ_API_KEY to activate inference)."
            
        # 3. Bhashini TTS (Text to Speech)
        response_audio_b64 = bhashini.text_to_speech(answer, language)
        
        return ChatResponse(
            response=answer,
            audio_base64=response_audio_b64,
            language=language
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
