import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatsnackbarService } from 'src/app/service/matsnackbar.service';
import { SongService } from 'src/app/service/song.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  song: any;

  constructor(private songservice: SongService,
    private ngxLoader:NgxUiLoaderService,private router:Router) { }

  ngOnInit(): void {
   this.ngxLoader.start();
   if(localStorage.getItem('token'))
    this.songservice.selectedSongData$.subscribe((songData: any) => {
      this.song = songData;
      this.ngxLoader.stop();
    });
  }

  login(){
    this.ngxLoader.start()
    this.router.navigate(['login'])
    this.ngxLoader.stop();
  }
  
  signup(){
    this.ngxLoader.start()
    this.router.navigate(['signup'])
    this.ngxLoader.stop();
  }
}