// createplaylist.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from 'src/app/service/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { MatsnackbarService } from 'src/app/service/matsnackbar.service';
import { songCards } from 'src/app/songCards';
import { SongService } from 'src/app/service/song.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-createplaylist',
  templateUrl: './createplaylist.component.html',
  styleUrls: ['./createplaylist.component.css']
})
export class CreateplaylistComponent implements OnInit {
  songs: songCards[] = [];
  isUserLoggedIn: boolean = false;
  playlistForm: FormGroup;
  id: any;
  responseMessage: any;
  selectedSongs: songCards[] = [];
  isEdit = false;
  Createbtn: string = 'Create'

  constructor(
    private songService: SongService,
    private fb: FormBuilder,
    private servicee: MatsnackbarService,
    private router: Router,
    private ngxLoader: NgxUiLoaderService,
    private jwtHelper: JwtHelperService,
    private userservice: UserService,
    @Inject(MAT_DIALOG_DATA) public editlist: any,
    private dialog: MatDialog
  ) {
    this.songs = this.songService.songs;
    this.isUserLoggedIn = localStorage.getItem('token') !== null;
    this.playlistForm = this.fb.group({
      playlistName: ['', [Validators.required, Validators.maxLength(50)]],
      id: [],
    });


    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.id = decodedToken.id;
      this.playlistForm.controls['id'].setValue(this.id);
    }
    this.isEdit = editlist ? true : false;
  }

  ngOnInit() {
    if (this.editlist) {
      const playlistNameControl = this.playlistForm.get('playlistName') as FormControl;
      if (playlistNameControl) {
        playlistNameControl.setValue(this.editlist.playlistName);
      }
      const songsArray = this.editlist.songs;
      this.playlistForm.get('songs')?.setValue(songsArray);
      this.selectedSongs = songsArray;
    }
  }
  onEditPlaylist(playlist: any) {
    this.isEdit = true;
    this.Createbtn = 'Update';
    this.selectedSongs = playlist.songs;
   
  }

  onSubmit() {
    if (this.playlistForm.valid) {
      this.ngxLoader.start();
      const playlistData = {
        playlistName: this.playlistForm.value.playlistName,
        id: this.playlistForm.value.id,
        songs: this.selectedSongs,
      };

      if (this.editlist) {
        const userId = this.editlist.unique;
        this.Createbtn = 'Update'
        this.userservice.updateplaylist(userId, playlistData).subscribe(
          (result: any) => {
            this.responseMessage = result?.message;
            this.servicee.open(this.responseMessage, 'success');
            this.router.navigate(['home']);
            this.ngxLoader.stop();
            this.dialog.closeAll()
          },
          (error) => {
            if (error.error?.message) {
              this.responseMessage = error.error.message;
            } else {
              this.responseMessage = 'Something went wrong. Please try again later.';
            }
            this.servicee.open(this.responseMessage, 'error')
            this.ngxLoader.stop();
          }
        );
      } else {
        this.Createbtn = 'Create'
        this.userservice.createplaylist(playlistData).subscribe(
          (result: any) => {
            this.responseMessage = result?.message;
            this.servicee.open(this.responseMessage, 'success');
            this.router.navigate(['home']);
            this.ngxLoader.stop();
            this.dialog.closeAll()
          },
          (error) => {
            if (error.error?.message) {
              this.responseMessage = error.error.message;
            } else {
              this.responseMessage = 'Something went wrong. Please try again later.';
            }
            this.servicee.open(this.responseMessage, 'error');
            this.ngxLoader.stop();
          }
        );
      }
    } else {
      this.playlistForm.markAllAsTouched();
      return;
    }
  }


  toggleSelection(song: songCards) {
    const index = this.selectedSongs.findIndex((selectedSong) => selectedSong.song_id === song.song_id);
    if (index === -1) {
      this.selectedSongs.push(song);
    } else {
      this.selectedSongs.splice(index, 1);
    }
  }

  isSongSelected(song: songCards): boolean {
    return this.selectedSongs.some((selectedSong) => selectedSong.song_id === song.song_id);
  }
}
