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
      const marathiMarkers = ['आहे', 'नाही', 'काय', 'कसे', 'कशी', 'सांगा', 'पीक', 'शेतकरी', 'कर्ज', 'हक्क', 'पॅक्स', 'उपनियम', 'मिळेल', 'करावे', 'झाले', 'होते', 'आमचे', 'करावा', 'मिळणार', 'आहोत', 'दिले', 'घेता'];
      const hindiMarkers = ['है', 'नहीं', 'क्या', 'कैसे', 'कैसी', 'बताओ', 'फसल', 'किसान', 'ऋण', 'अधिकार', 'पैक्स', 'उपनियम', 'मिलेगा', 'करना', 'होगा', 'हमारा', 'कीजिए', 'दीजिए'];
      
      const marathiCount = marathiMarkers.filter(m => transcript.includes(m)).length;
      const hindiCount = hindiMarkers.filter(m => transcript.includes(m)).length;

      if (marathiCount > hindiCount) return 'mr';
      if (hindiCount > marathiCount) return 'hi';
      if (marathiCount > 0) return 'mr';
      if (fallbackLang === 'mr') return 'mr';
      return 'hi';
    }

    // 6. Transliterated Latin detection with English stopword scoring
    const lower = transcript.toLowerCase();
    const words = lower.split(/[^a-z0-9]+/);

    const englishStopwords = new Set([
      'what', 'which', 'who', 'how', 'when', 'where', 'why', 'is', 'are', 'was', 'were',
      'the', 'this', 'that', 'for', 'from', 'with', 'under', 'act', 'rule', 'rules',
      'membership', 'member', 'society', 'societies', 'cooperative', 'loan', 'credit',
      'scheme', 'schemes', 'insurance', 'government', 'guidelines', 'portal', 'register',
      'can', 'i', 'my', 'your', 'please', 'tell', 'me', 'about', 'explain', 'details'
    ]);

    const marathiWords = new Set(['shetkari', 'pik', 'vima', 'hakk', 'kasa', 'sang', 'sanstha', 'karj', 'ahe', 'kase', 'kay', 'nahi', 'madhe', 'ani', 'amhi']);
    const hindiWords = new Set(['kisan', 'yojana', 'fasal', 'bima', 'kaise', 'kya', 'batao', 'adhikar', 'sahakari', 'namaste', 'bataiye', 'karein', 'hai', 'nahi', 'mein', 'aur', 'hum']);
    const gujaratiWords = new Set(['khedut', 'mandli', 'bima', 'yojna', 'kem', 'pak', 'vimo', 'adhikar', 'chhe', 'ma']);
    const bengaliWords = new Set(['krishok', 'somobay', 'fasol', 'bima', 'kibhabe', 'amar', 'ki']);
    const tamilWords = new Set(['payir', 'kadan', 'kooturavu', 'epadi', 'enna', 'illai']);
    const teluguWords = new Set(['raitu', 'sahakara', 'runam', 'ela', 'emiti', 'ledu']);

    let enCount = 0, mrCount = 0, hiCount = 0, guCount = 0, bnCount = 0, taCount = 0, teCount = 0;

    for (const w of words) {
      if (englishStopwords.has(w)) enCount++;
      if (marathiWords.has(w)) mrCount++;
      if (hindiWords.has(w)) hiCount++;
      if (gujaratiWords.has(w)) guCount++;
      if (bengaliWords.has(w)) bnCount++;
      if (tamilWords.has(w)) taCount++;
      if (teluguWords.has(w)) teCount++;
    }

    // If English markers outnumber regional transliterations, return 'en'
    if (enCount > 0 && enCount >= mrCount && enCount >= hiCount && enCount >= guCount) {
      return 'en';
    }

    const maxCount = Math.max(mrCount, hiCount, guCount, bnCount, taCount, teCount);
    if (maxCount > 0) {
      if (mrCount === maxCount) return 'mr';
      if (hiCount === maxCount) return 'hi';
      if (guCount === maxCount) return 'gu';
      if (bnCount === maxCount) return 'bn';
      if (taCount === maxCount) return 'ta';
      if (teCount === maxCount) return 'te';
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

  // Speech Recognition (Web Speech API with graceful fallback, speech-end detection & language analysis)
  public startListening(
    lang: LanguageCode = 'en',
    onResult: (transcript: string, detectedLanguage: LanguageCode) => void,
    onError?: (err: string) => void,
    onEnd?: () => void,
    options?: {
      onInterim?: (interim: string) => void;
      onSpeechEnd?: () => void;
    }
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
        te: 'పీఎం ఫసల్ బీమా యોజన కోసం ప్రీమియం ఎంత?',
        bn: 'প্যাক্স (PACS) সমবায় সমিতি থেকে কীভাবে সার পাওয়া যায়?'
      };

      const prompt = simulatedPrompts[lang] || simulatedPrompts.en;
      const detected = this.analyzeVoiceLanguage(prompt, lang);

      // Simulate real-time speech intake
      options?.onInterim?.(prompt.slice(0, Math.floor(prompt.length / 2)) + '...');
      
      const speechEndTimer = setTimeout(() => {
        options?.onSpeechEnd?.();
      }, 1200);

      const finishTimer = setTimeout(() => {
        onResult(prompt, detected);
        onEnd?.();
      }, 1800);

      return {
        stop: () => {
          clearTimeout(speechEndTimer);
          clearTimeout(finishTimer);
          onEnd?.();
        }
      };
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = this.getLocale(lang);

      let finalTranscript = '';
      let hasDelivered = false;
      let silenceTimer: any = null;

      const finishAndDeliver = () => {
        if (hasDelivered) return;
        const text = finalTranscript.trim();
        if (text) {
          hasDelivered = true;
          try {
            recognition.stop();
          } catch (e) {
            // ignore
          }
          const detected = this.analyzeVoiceLanguage(text, lang);
          onResult(text, detected);
        }
      };

      recognition.onspeechstart = () => {
        // Speech started
      };

      recognition.onspeechend = () => {
        // User stopped talking!
        options?.onSpeechEnd?.();
        // Give 400ms for final result packets, then finish
        setTimeout(() => {
          finishAndDeliver();
        }, 400);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalTranscript += item[0].transcript + ' ';
          } else {
            interim += item[0].transcript;
          }
        }

        if (interim) {
          options?.onInterim?.((finalTranscript + ' ' + interim).trim());
        }

        // Reset silence timer whenever words arrive
        if (silenceTimer) clearTimeout(silenceTimer);
        silenceTimer = setTimeout(() => {
          if (finalTranscript.trim()) {
            finishAndDeliver();
          }
        }, 1200);

        // If the browser marked this result as final
        if (finalTranscript.trim() && !interim) {
          options?.onSpeechEnd?.();
          setTimeout(() => {
            finishAndDeliver();
          }, 300);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('SpeechRecognition error:', event.error);
        if (silenceTimer) clearTimeout(silenceTimer);
        // If we already have a transcript, deliver it despite minor network/no-speech errors
        if (finalTranscript.trim() && !hasDelivered) {
          finishAndDeliver();
        } else {
          onError?.(event.error);
        }
      };

      recognition.onend = () => {
        if (silenceTimer) clearTimeout(silenceTimer);
        if (finalTranscript.trim() && !hasDelivered) {
          finishAndDeliver();
        }
        onEnd?.();
      };

      recognition.start();

      return {
        stop: () => {
          if (silenceTimer) clearTimeout(silenceTimer);
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
