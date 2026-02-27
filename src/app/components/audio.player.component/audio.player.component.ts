import { Component, OnInit } from '@angular/core';
import { Track } from '@models/track';
import { AudioPlayerService } from '@services/audioplayer/audio-player.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio.player.component.html',
  styleUrls: ['./audio.player.component.scss'],
})
export class AudioPlayerComponent implements OnInit {
  covers = [
    'assets/covers/cover1.jpg',
    'assets/covers/cover2.jpg',
    'assets/covers/cover3.jpg',
  ];

  constructor(public player: AudioPlayerService) {}

  ngOnInit(): void {
    const tracks: Track[] = [
      {
        id: '1',
        title: 'Te serviremos Señor',
        artist: 'Ilbd Worship',
        driveUrl: '/assets/audioPlayer/TeServiremosSenor.mp3',
        cover: 'assets/audioPlayer/custom1.png',
      },
      {
        id: '2',
        title: 'Le daré la gloria',
        artist: 'Ilbd Worship',
        driveUrl: '/assets/audioPlayer/LeDareLaGloria.mp3',
        cover: 'assets/audioPlayer/custom2.png',
      },
      {
        id: '3',
        title: 'Guiame Dios',
        artist: 'Ilbd Worship',
        driveUrl: '/assets/audioPlayer/GuiameDios.mp3',
        cover: 'assets/audioPlayer/custom3.png',
      },
      {
        id: '4',
        title: 'De la casa a las naciones',
        artist: 'Ilbd Worship',
        driveUrl: '/assets/audioPlayer/DeLaCasaALasNaciones.mp3',
        cover: 'assets/audioPlayer/custom1.png',
      },
    ].map(t => ({
      ...t,
    }));

    this.player.setPlaylist(tracks, 0);
  }

  onSeek(event: MouseEvent, bar: HTMLElement) {
    const rect = bar.getBoundingClientRect();
    const percent = ((event.clientX - rect.left) / rect.width) * 100;
    this.player.seekToPercent(Math.max(0, Math.min(100, percent)));
  }

  formatTime(sec: number) {
    if (!sec || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  }
}
