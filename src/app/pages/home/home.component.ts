import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SearchService } from 'src/app/service/search.service';
import {  CreateplaylistComponent } from '../createplaylist/createplaylist.component';
import { songCards } from 'src/app/songCards';
import { UserService } from 'src/app/service/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SongService } from 'src/app/service/song.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatsnackbarService } from 'src/app/service/matsnackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedPlaylistt:boolean=false
  selectedPlaylist: any;
  selectedPlaylistSongs: songCards[] = [];
  songs: songCards[] = []
  playlists: any[] = []; 
  id: any;
  responseMessage:any
  
  constructor(private songService: SongService
    ,private servicee:MatsnackbarService ,private service: SearchService, private dialog: MatDialog, 
    private userservice: UserService,private jwtHelper: JwtHelperService,private loader:NgxUiLoaderService,
    private router:Router) { 
    this.songs = this.songService.songs; 
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.id = decodedToken.id;
      this.userservice.getUserPlaylist(this.id).subscribe((result: any) => {
        this.playlists = result.map((playlist: any) => ({
          ...playlist,
          songs: JSON.parse(playlist.songs),
        }));
      });
    }
  }
  
  ngOnInit(): void {}

  NavigatetoSearch(PageName: string) {
    if (PageName === 'search') {
      this.service.IssearchVisible.next(true);
    } else {
      this.service.IssearchVisible.next(false)
    }
  }

  Dialogopen() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '450px'; 
  dialogConfig.height = '550px'; 
  dialogConfig.panelClass = 'custom-dialog';
  this.dialog.open(CreateplaylistComponent, dialogConfig);
 }

 editplaylist(item:any){
 this.dialog.open(CreateplaylistComponent,{
  width:'450px',
  height:'550px',
  data:item
 })
 }

  showPlaylistSongs(playlist: any) {
  this.selectedPlaylist = playlist;
  this.selectedPlaylistSongs =playlist.songs;
 }

  deleteplay(unique: any) {
  this.loader.start();
  this.userservice.deleteplaylist(unique).subscribe((result: any) => {
    console.log(result);
    this.userservice.getUserPlaylist(this.id).subscribe((result: any) => {
      console.log(result)
    })
    this.responseMessage = result?.message;
    this.servicee.open(this.responseMessage, 'success');
    this.router.navigate(['']);
    this.loader.stop();
  }, (error) => {
    if (error.error?.message) {
      this.responseMessage = error.error.message;
    } else {
      this.responseMessage = 'Something went wrong. Please try again later.';
    }
    this.servicee.open(this.responseMessage, 'error');
    this.loader.stop();
  });
 }
}
 
