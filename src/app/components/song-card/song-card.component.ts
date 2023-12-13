import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SongService } from 'src/app/service/song.service';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css']
})
export class SongCardComponent implements OnInit {
  @Input() public playlistthumbnail!: string;
  @Input() public title!: string;
  @Input() public description!: string;
  @Input() public song_id!: string;
  @Input() public Link!: string;

  constructor(private router: Router, private songservice: SongService,
    private ngxLoader:NgxUiLoaderService) {}

  ngOnInit(): void {}

  NavigatetoSong() {
  
    this.ngxLoader.start();
    this.router.navigateByUrl(`/song/${this.song_id}`);
    this.songservice.setSelectedSongData({
      thumbnail: this.playlistthumbnail,
      title: this.title,
      description: this.description,
      Link: this.Link
    });
    this.ngxLoader.stop();
  }
}
