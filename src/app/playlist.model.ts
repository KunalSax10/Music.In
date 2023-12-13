import { songCards } from "./songCards";

// playlist.model.ts
export class Playlist {
    constructor(public name: string, public songs: songCards[]) {}
  }
  