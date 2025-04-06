
// Speech recognition and synthesis service
import type { SpeechRecognition } from '../types/speech'; // Import the type directly

class SpeechService {
  private synth: SpeechSynthesis;
  private recognition: SpeechRecognition | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isRecognitionSupported: boolean;
  
  constructor() {
    this.synth = window.speechSynthesis;
    this.isRecognitionSupported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    
    // Initialize speech recognition if supported
    if (this.isRecognitionSupported) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        this.recognition = new SpeechRecognitionAPI();
        if (this.recognition) {
          this.recognition.continuous = false;
          this.recognition.interimResults = false;
        }
      }
    }
    
    // Load available voices
    this.loadVoices();
    this.synth.addEventListener('voiceschanged', this.loadVoices.bind(this));
  }
  
  private loadVoices(): void {
    this.voices = this.synth.getVoices();
  }
  
  // Get voice that best matches the language code
  getVoiceForLanguage(languageCode: string): SpeechSynthesisVoice | null {
    if (this.voices.length === 0) {
      this.loadVoices();
    }
    
    // Try to find an exact match for the language code
    let voice = this.voices.find(v => v.lang.toLowerCase() === languageCode.toLowerCase());
    
    // If no exact match, try to find a voice that starts with the language code
    if (!voice) {
      voice = this.voices.find(v => v.lang.toLowerCase().startsWith(languageCode.split('-')[0].toLowerCase()));
    }
    
    // Fallback to default voice
    return voice || (this.voices.length > 0 ? this.voices[0] : null);
  }
  
  // Text to speech
  speak(text: string, languageCode: string = 'en-US'): void {
    if (!this.synth) return;
    
    // Cancel any ongoing speech
    this.synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = this.getVoiceForLanguage(languageCode);
    
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.lang = languageCode;
    utterance.rate = 1;
    utterance.pitch = 1;
    
    // Add an event listener to detect when speech ends
    utterance.onend = () => {
      // This event will fire when the utterance finishes speaking
      // We can dispatch a custom event if needed
      const event = new Event('speechend');
      document.dispatchEvent(event);
    };
    
    this.synth.speak(utterance);
  }
  
  // Stop speaking
  stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }
  
  // Check if speech synthesis is available
  isSpeechSynthesisSupported(): boolean {
    return 'speechSynthesis' in window;
  }
  
  // Check if speech recognition is available
  isSpeechRecognitionSupported(): boolean {
    return this.isRecognitionSupported;
  }
  
  // Speech to text
  listen(onResult: (text: string) => void, languageCode: string = 'en-US'): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }
      
      this.recognition.lang = languageCode;
      
      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        resolve();
      };
      
      this.recognition.onerror = (event) => {
        reject(new Error(`Speech recognition error: ${event.error}`));
      };
      
      this.recognition.onend = () => {
        resolve();
      };
      
      this.recognition.start();
    });
  }
  
  // Stop listening
  stopListening(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}

// Create a singleton instance
const speechService = new SpeechService();

export default speechService;
