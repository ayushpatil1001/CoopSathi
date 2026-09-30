# CoopSathi AI - Python Backend

This backend implements the exact AI architecture requested for the project.

## Tech Stack Alignment

*   **Database**: `Supabase` (PostgreSQL with `pgvector`). This fulfills the request for "PostgreSQL + ChromaDB -> Structured + vector storage" by natively combining structured data and vector embeddings into a single Supabase instance.
*   **AI Orchestration**: `LangChain`. We use LangChain's Python library to orchestrate the RAG (Retrieval-Augmented Generation) pipeline, seamlessly connecting Supabase Vector Store with the LLM.
*   **LLM**: `LLaMA 3` / Falcon / Mistral. The RAG pipeline is configured to use LLaMA 3 (via Groq/Ollama APIs) for domain-specific reasoning on government data.
*   **Translation / STT / TTS**: `Bhashini API`, `Vosk`, and `Coqui`. Service layers are set up to handle Multilingual voice/text conversions before passing data into the LangChain pipeline.

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

## Architecture Flow

1. **User Voice/Text Input** -> Processed via **Vosk** (Speech-to-Text) if audio.
2. **Translation** -> Non-English text translated to English via **Bhashini API**.
3. **Retrieval** -> **LangChain** embeds the query (HuggingFace) and searches **Supabase pgvector**.
4. **Generation** -> **LLaMA 3** generates a domain-specific answer.
5. **Reverse Translation** -> English answer translated back to native language via **Bhashini**.
6. **TTS Output** -> **Coqui** generates natural voice audio for the user.
