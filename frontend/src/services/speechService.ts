import { LanguageCode } from '../types';

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  // Language code to BCP 47 locale mapping
  public getLocale(lang: LanguageCode): string {
    switch (lang) {
      case 'hi': return 'hi-IN';
      case 'mr': return 'mr-IN';
      case 'gu': return 'gu-IN';
      case 'ta': return 'ta-IN';
      case 'te': return 'te-IN';
      case 'bn': return 'bn-IN';
      case 'en':
      default: return 'en-IN';
    }
  }

  /**
   * Analyzes spoken transcript to detect or refine the preferred Indian language.
   * Enables automatic language matching for voice queries & replies.
   */
  public analyzeVoiceLanguage(transcript: string, fallbackLang: LanguageCode = 'en'): LanguageCode {
    if (!transcript) return fallbackLang;

    // 1. Gujarati Unicode range: \u0A80-\u0AFF
    if (/[\u0A80-\u0AFF]/.test(transcript)) {
      return 'gu';
    }

    // 2. Bengali Unicode range: \u0980-\u09FF
    if (/[\u0980-\u09FF]/.test(transcript)) {
      return 'bn';
    }

    // 3. Tamil Unicode range: \u0B80-\u0BFF
    if (/[\u0B80-\u0BFF]/.test(transcript)) {
      return 'ta';
    }

    // 4. Telugu Unicode range: \u0C00-\u0C7F
    if (/[\u0C00-\u0C7F]/.test(transcript)) {
      return 'te';
    }

    // 5. Devanagari Unicode range: \u0900-\u097F (Hindi or Marathi)
    if (/[\u0900-\u097F]/.test(transcript)) {
      const marathiMarkers = ['आहे', 'नाही', 'काय', 'कसे', 'कशी', 'सांगा', 'पीक', 'शेतकरी', 'कर्ज', 'हक्क', 'पॅक्स', 'उपनियम', 'मिळेल', 'करावे', 'झाले', 'होते', 'आमचे'];
      const hasMarathiMarker = marathiMarkers.some(m => transcript.includes(m));
      if (hasMarathiMarker || fallbackLang === 'mr') {
        return 'mr';
      }
      return 'hi';
    }

    // 6. Transliterated Latin detection
    const lower = transcript.toLowerCase();
    const marathiTranslit = ['shetkari', 'pik', 'vima', 'hakk', 'kasa', 'sang', 'sanstha', 'karj', 'ahe'];
    if (marathiTranslit.some(w => lower.includes(w))) {
      return 'mr';
    }

    const hindiTranslit = ['kisan', 'yojana', 'fasal', 'bima', 'kaise', 'kya', 'batao', 'adhikar', 'sahakari', 'namaste'];
    if (hindiTranslit.some(w => lower.includes(w))) {
      return 'hi';
    }

    const gujaratiTranslit = ['khedut', 'mandli', 'bima', 'yojna', 'su chhe', 'kem'];
    if (gujaratiTranslit.some(w => lower.includes(w))) {
      return 'gu';
    }

    return fallbackLang;
  }

  public speak(
    text: string,
    lang: LanguageCode = 'en',
    onStart?: () => void,
    onEnd?: () => void,
    onError?: () => void
  ): void {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this environment.');
      onEnd?.();
      return;
    }

    // Stop any ongoing speech
    this.stop();

    // Clean text of markdown formatting and emojis for clean speech
    const cleanText = text
      .replace(/[*_~`#\[\]\(\)]/g, '')
      .replace(/✓/g, 'verified')
      .replace(/⚖️|🏛️|📞|🌐|👋|🌾|🛡️|💰|📢|✨/g, '')
      .replace(/\n+/g, '. ')
      .trim();

    if (!cleanText) {
      onEnd?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = this.getLocale(lang);
    utterance.rate = 0.95; // Friendly, clear pacing
    utterance.pitch = 1.0;

    // Pick best available voice matching language
    const voices = this.synth.getVoices();
    const targetLocale = this.getLocale(lang);
    const matchingVoice = voices.find(v => v.lang === targetLocale || v.lang.startsWith(lang));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      onStart?.();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      onEnd?.();
    };

    utterance.onerror = (err) => {
      console.warn('Speech synthesis error:', err);
      this.isSpeaking = false;
      this.currentUtterance = null;
      onError?.();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public stop(): void {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        // ignore
      }
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  public isCurrentlySpeaking(): boolean {
    return this.isSpeaking;
  }

  // Speech Recognition (Web Speech API with graceful fallback & language analysis)
  public startListening(
    lang: LanguageCode = 'en',
    onResult: (transcript: string, detectedLanguage: LanguageCode) => void,
    onError?: (err: string) => void,
    onEnd?: () => void
  ): { stop: () => void } {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('SpeechRecognition API not available, simulating microphone prompt.');
      const simulatedPrompts: Record<LanguageCode, string> = {
        en: 'What are my voting rights as a cooperative society member under Section 29?',
        hi: 'प्रधानमंत्री फसल बीमा योजना में ७२ घंटे के भीतर क्लेम कैसे करें?',
        mr: 'पॅक्स (PACS) मधून शून्य टक्के व्याज कर्ज व खते कशी मिळतील?',
        gu: 'પ્રાથમિક કૃષિ ધિરાણ મંડળી (PACS) ના નિયમો અને સહાય શું છે?',
        ta: 'கூட்டுறவு சங்கத்தில் பயிர் கடன் பெறுவது எப்படி?',
        te: 'పీఎం ఫసల్ బీమా యోజన కోసం ప్రీమియం ఎంత?',
        bn: 'প্যাক্স (PACS) সমবায় সমিতি থেকে কীভাবে সার পাওয়া যায়?'
      };

      const prompt = simulatedPrompts[lang] || simulatedPrompts.en;
      const detected = this.analyzeVoiceLanguage(prompt, lang);

      const timer = setTimeout(() => {
        onResult(prompt, detected);
        onEnd?.();
      }, 2000);

      return { stop: () => { clearTimeout(timer); onEnd?.(); } };
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = this.getLocale(lang);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        const detected = this.analyzeVoiceLanguage(transcript, lang);
        onResult(transcript, detected);
      };

      recognition.onerror = (event: any) => {
        console.warn('SpeechRecognition error:', event.error);
        onError?.(event.error);
      };

      recognition.onend = () => {
        onEnd?.();
      };

      recognition.start();

      return {
        stop: () => {
          try {
            recognition.stop();
          } catch (e) {
            // ignore
          }
        }
      };
    } catch (e: any) {
      console.error('Failed to start speech recognition:', e);
      onError?.(e.message || 'Speech recognition unavailable');
      return { stop: () => {} };
    }
  }
}

export const speechService = new SpeechService();
