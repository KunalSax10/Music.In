import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/service/search.service';
import { UserService } from 'src/app/service/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  SearchFieldVisible: boolean = false;
  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(private router: Router, private service: SearchService, private jwtHelper: JwtHelperService) {
    this.checkTokenExpiration()
  }

  ngOnInit(): void {
    this.service.IssearchVisible.subscribe(result => {
      this.SearchFieldVisible = result;
    });

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.userName = decodedToken.name;

      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  Login() {
    this.router.navigate(['/login']);
  }

  Signup() {
    this.router.navigate(['/signup']);
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['']);
    window.location.reload();
  }

  checkTokenExpiration() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
      const currentTime = Date.now();
  
      if (currentTime >= expirationTime) { 
        localStorage.removeItem('token');
        this.isLoggedIn = false;
      } else {
        this.userName = decodedToken.name;
        this.isLoggedIn = true;
      }
    } else {
      this.isLoggedIn = false;
    }
  }  
  
}
