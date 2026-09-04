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
  private getLocale(lang: LanguageCode): string {
    switch (lang) {
      case 'hi': return 'hi-IN';
      case 'mr': return 'mr-IN';
      case 'ta': return 'ta-IN';
      case 'te': return 'te-IN';
      case 'bn': return 'bn-IN';
      case 'en':
      default: return 'en-IN';
    }
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

    // Clean text of markdown characters
    const cleanText = text
      .replace(/[*_~`#\[\]\(\)]/g, '')
      .replace(/✓/g, 'verified')
      .replace(/\n+/g, '. ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = this.getLocale(lang);
    utterance.rate = 0.95; // Slightly slower for elderly/rural clarity
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
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  public isCurrentlySpeaking(): boolean {
    return this.isSpeaking;
  }

  // Speech Recognition (Web Speech API with graceful browser fallback)
  public startListening(
    lang: LanguageCode = 'en',
    onResult: (transcript: string) => void,
    onError?: (err: string) => void,
    onEnd?: () => void
  ): { stop: () => void } {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('SpeechRecognition API not available, simulating microphone prompt.');
      // Provide simulated friendly input prompts in chosen language
      const simulatedPrompts: Record<LanguageCode, string> = {
        en: 'What are my voting rights as a cooperative society member?',
        hi: 'प्रधानमंत्री फसल बीमा योजना के लिए पात्रता क्या है?',
        mr: 'पॅक्स (PACS) मधून खते आणि शून्य टक्के व्याज कर्ज कसे मिळेल?',
        ta: 'கூட்டுறவு சங்கத்தில் பயிர் கடன் பெறுவது எப்படி?',
        te: 'పీఎం ఫసల్ బీమా యోజన కోసం ప్రీమియం ఎంత?',
        bn: 'প্যাক্স (PACS) সমবায় সমিতি থেকে কীভাবে সার পাওয়া যায়?'
      };

      setTimeout(() => {
        onResult(simulatedPrompts[lang] || simulatedPrompts.en);
        onEnd?.();
      }, 2500);

      return { stop: () => onEnd?.() };
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = this.getLocale(lang);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
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
