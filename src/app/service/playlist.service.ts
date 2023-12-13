import { Injectable } from '@angular/core';
import { Playlist } from '../playlist.model';
import { songCards } from '../songCards';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlists: Playlist[] = [];

  createPlaylist(name: string, songs: songCards[]): void {
    const playlist = new Playlist(name, songs);
    this.playlists.push(playlist);
  }

  getPlaylists(): Playlist[] {
    return this.playlists;
  }
}