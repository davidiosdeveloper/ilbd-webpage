import { Injectable, signal, computed, effect } from '@angular/core';
import { Track } from '@models/track';
import { Utils } from '@shared/utils';

type PlayerStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'ended' | 'error';

@Injectable({ providedIn: 'root' })
export class AudioPlayerService {
  private audio = new Audio();
  private rafId: number | null = null;

  // Estado
  playlist = signal<Track[]>([]);
  currentIndex = signal<number>(0);
  status = signal<PlayerStatus>('idle');
  currentTime = signal<number>(0);
  duration = signal<number>(0);
  volume = signal<number>(1);

  currentTrack = computed(() => this.playlist()[this.currentIndex()]);
  progress = computed(() => {
    const d = this.duration();
    return d > 0 ? (this.currentTime() / d) * 100 : 0;
  });

  constructor(private utils: Utils) {
    // Configuración inicial
    this.audio.preload = 'metadata';
    this.audio.addEventListener('loadedmetadata', () => {
      this.duration.set(this.audio.duration || 0);
      this.status.set(this.audio.paused ? 'paused' : 'playing');
    });
    this.audio.addEventListener('ended', () => {
      this.status.set('ended');
      this.next();
    });
    this.audio.addEventListener('error', () => {
      this.status.set('error');
    });

    effect(() => {
      this.audio.volume = this.volume();
    });
  }

  setPlaylist(tracks: Track[], startIndex = 0) {
    this.playlist.set(tracks);
    this.currentIndex.set(Math.max(0, Math.min(startIndex, tracks.length - 1)));
    this.loadCurrent(false);
  }

  loadCurrent(autoplay = false) {
    const track = this.currentTrack();
    if (!track) return;

    this.status.set('loading');
    this.currentTime.set(0);
    this.duration.set(0);

    // this.audio.src = this.utils.toDriveDirectUrl(track.driveUrl); // cuando viene de url
    this.audio.src = track.driveUrl; // cuando viene de assets
    this.audio.load();

    if (autoplay) this.play();
  }

  play() {
    if (!this.currentTrack()) return;
    this.status.set('loading');
    this.audio.play()
      .then(() => {
        this.status.set('playing');
        this.startProgressLoop();
      })
      .catch(() => this.status.set('error'));
  }

  pause() {
    this.audio.pause();
    this.status.set('paused');
    this.stopProgressLoop();
  }

  toggle() {
    if (this.status() === 'playing') this.pause();
    else this.play();
  }

  seekToPercent(percent: number) {
    const d = this.duration();
    if (d <= 0) return;
    const t = (percent / 100) * d;
    this.audio.currentTime = t;
    this.currentTime.set(t);
  }

  next() {
    const list = this.playlist();
    if (!list.length) return;
    this.currentIndex.set((this.currentIndex() + 1) % list.length);
    this.loadCurrent(true);
  }

  prev() {
    const list = this.playlist();
    if (!list.length) return;
    this.currentIndex.set((this.currentIndex() - 1 + list.length) % list.length);
    this.loadCurrent(true);
  }

  setVolume(v: number) {
    this.volume.set(Math.max(0, Math.min(1, v)));
  }

  private startProgressLoop() {
    this.stopProgressLoop();
    const tick = () => {
      this.currentTime.set(this.audio.currentTime || 0);
      if (!this.audio.paused) this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  private stopProgressLoop() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }
}