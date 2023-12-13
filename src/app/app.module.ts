import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { SongCardComponent } from './components/song-card/song-card.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SongComponent } from './pages/song/song.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon'
import {MatMenuModule} from '@angular/material/menu'
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, SPINNER } from 'ngx-ui-loader';
import { CreateplaylistComponent } from './pages/createplaylist/createplaylist.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';

const ngxUiLoaderConfig:NgxUiLoaderConfig = {
  text:'Loading',
  textColor:"#FFFFFF",
  textPosition:"center-center",
  pbColor:'rgb(252, 0, 117)',
  bgsColor:'rgb(252, 0, 117)',
  fgsColor:' rgb(252, 0, 117)',
  fgsType:SPINNER.ballSpinClockwise,
  fgsSize:60,
  pbDirection:PB_DIRECTION.leftToRight,
  pbThickness:3
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    SongCardComponent,
    TopNavComponent,
    SongComponent,
    CreateplaylistComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,MatIconModule,MatMenuModule,MatDialogModule,FormsModule,
    HttpClientModule,MatTooltipModule,
    BrowserAnimationsModule,MatSnackBarModule,NgxUiLoaderModule.forRoot(ngxUiLoaderConfig) ,JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),
  ],
  
  providers: [JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
