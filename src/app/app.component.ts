import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'musicin';

  constructor(private ngxloader:NgxUiLoaderService){}

  ngOnInit(): void{
    this.ngxloader.start();
    window.onload= () =>{
      this.ngxloader.stop();
    }
  }
}
