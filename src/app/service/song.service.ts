import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { songCards } from '../songCards';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  songs: songCards[] = [
    {
      song_id: 1,
      thumbnail: 'assets/images/music.png',
      title: 'Song 1 ',
      description: 'Relax and indulge with beautifull piano',
      songLink:'assets/songs/kalastar.mp3'
    },
    {
      song_id: 2,
      thumbnail: 'assets/images/music.png',
      title: 'Song 2 ',
      description: 'Relax and indulge with beautifull piano',
      songLink:''
    },
    {
      song_id: 3,
      thumbnail: 'assets/images/music.png',
      title: 'Song 3 ',
      description: 'Relax and indulge with beautifull piano',
      songLink:''
    },
    {
      song_id: 4,
      thumbnail: 'assets/images/music.png',
      title: 'Song 4 ',
      description: 'Relax and indulge with beautifull piano',
      songLink:''
    },
    {
      song_id: 5,
      thumbnail: 'assets/images/music.png',
      title: 'Song 5',
      description: 'Relax and indulge with beautifull piano',
      songLink:''
    },
    {
      song_id: 6,
      thumbnail: 'assets/images/music.png',
      title: 'Song 6 ',
      description: 'Relax and indulge with beautifull piano',
      songLink:'assts/song/kalastar.mp3'
    },
    {
      song_id: 7,
      thumbnail: 'assets/images/music.png',
      title: 'Song 7 ',
      description: 'Relax and indulge with beautifull piano',
      songLink:''
    },
    {
      song_id: 8,
      thumbnail: 'assets/images/music.png',
      title: 'Song 8 ',
      description: 'Relax and indulge with beautifull piano',
      songLink:''
    },
    {
      song_id: 9,
      thumbnail: 'assets/images/music    .png',
      title: 'Song 9 ',
      description: 'Relax and indulge with beautifull piano',
      songLink:''
    }
  ]
  private selectedSongData = new BehaviorSubject<any>(null);
  selectedSongData$ = this.selectedSongData.asObservable();

  setSelectedSongData(data: any) {
    this.selectedSongData.next(data);
  }
}
