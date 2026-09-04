import { ChatMessage, GrievanceRecord, LanguageCode } from '../types';
import { INITIAL_GRIEVANCE_RECORDS } from '../data/mockGrievances';

const CHAT_HISTORY_KEY = 'coopsathi_chat_history';
const GRIEVANCES_KEY = 'coopsathi_grievances';
const LANG_PREF_KEY = 'coopsathi_lang_pref';
const FONT_SIZE_KEY = 'coopsathi_font_size';
const CONTRAST_KEY = 'coopsathi_contrast';

export const storageService = {
  getLanguage(): LanguageCode {
    if (typeof window === 'undefined') return 'en';
    return (localStorage.getItem(LANG_PREF_KEY) as LanguageCode) || 'en';
  },

  setLanguage(lang: LanguageCode): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANG_PREF_KEY, lang);
    }
  },

  getFontSize(): 'small' | 'normal' | 'large' | 'xlarge' {
    if (typeof window === 'undefined') return 'normal';
    return (localStorage.getItem(FONT_SIZE_KEY) as any) || 'normal';
  },

  setFontSize(size: 'small' | 'normal' | 'large' | 'xlarge'): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(FONT_SIZE_KEY, size);
      document.documentElement.setAttribute('data-font-size', size);
    }
  },

  getContrast(): 'normal' | 'high' {
    if (typeof window === 'undefined') return 'normal';
    return (localStorage.getItem(CONTRAST_KEY) as any) || 'normal';
  },

  setContrast(contrast: 'normal' | 'high'): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CONTRAST_KEY, contrast);
      document.documentElement.setAttribute('data-contrast', contrast);
    }
  },

  getChatHistory(): ChatMessage[] {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(CHAT_HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  saveChatHistory(messages: ChatMessage[]): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
      } catch (e) {
        console.error('Failed to save chat history', e);
      }
    }
  },

  clearChatHistory(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CHAT_HISTORY_KEY);
    }
  },

  getGrievances(): GrievanceRecord[] {
    if (typeof window === 'undefined') return INITIAL_GRIEVANCE_RECORDS;
    try {
      const saved = localStorage.getItem(GRIEVANCES_KEY);
      if (!saved) {
        localStorage.setItem(GRIEVANCES_KEY, JSON.stringify(INITIAL_GRIEVANCE_RECORDS));
        return INITIAL_GRIEVANCE_RECORDS;
      }
      return JSON.parse(saved);
    } catch {
      return INITIAL_GRIEVANCE_RECORDS;
    }
  },

  addGrievance(grievance: GrievanceRecord): void {
    const list = this.getGrievances();
    const updated = [grievance, ...list];
    if (typeof window !== 'undefined') {
      localStorage.setItem(GRIEVANCES_KEY, JSON.stringify(updated));
    }
  },

  findGrievance(refNumber: string): GrievanceRecord | undefined {
    const list = this.getGrievances();
    return list.find(g => g.referenceNumber.trim().toUpperCase() === refNumber.trim().toUpperCase());
  }
};
