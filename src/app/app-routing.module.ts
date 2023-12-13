import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SongComponent } from './pages/song/song.component';
import { CreateplaylistComponent } from './pages/createplaylist/createplaylist.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home | MUSIC.IN'   },
  { path: 'home', component: HomeComponent, title: 'Home | MUSIC.IN' },
  { path: 'login', component: LoginComponent, title: 'Login | MUSIC.IN'  },
  { path: 'signup', component: SignupComponent,  title: 'Sign Up | MUSIC.IN' },
  { path: 'song/:song_id', component: SongComponent,  title: 'Song Details | MUSIC.IN' },
  { path: 'create/:unique', component: CreateplaylistComponent,title: 'Create Playlist | MUSIC.IN'  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
