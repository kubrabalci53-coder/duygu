class SoundEffectEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Lazy init
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playTone(freq: number, type: OscillatorType = 'sine', duration: number = 0.3, gainLevel: number = 0.15) {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gainLevel, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay restrictions or errors
    }
  }

  public playChime(freq: number = 523.25) {
    if (this.isMuted) return;
    this.playTone(freq, 'sine', 0.5, 0.18);
    setTimeout(() => {
      this.playTone(freq * 1.25, 'sine', 0.6, 0.12);
    }, 80);
  }

  public playPop() {
    if (this.isMuted) return;
    this.playTone(600, 'triangle', 0.08, 0.12);
  }

  public playSuccessFanfare() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.4, 0.15);
      }, idx * 100);
    });
  }

  public playCalmZenBell() {
    if (this.isMuted) return;
    this.playTone(432, 'sine', 1.8, 0.2);
  }
}

export const sound = new SoundEffectEngine();
