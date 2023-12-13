import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  ApiUrl = 'http://localhost:5500'; // Assuming you have an "users" endpoint

  constructor(private http: HttpClient) { }

  // Register a new user
  register(data: any) {
    debugger
    console.log(data)
    return this.http.post(`${this.ApiUrl}/user/register`, data);
  }

  // Log in an existing user
  Login(data: any) {
    return this.http.post(`${this.ApiUrl}/user/login`, data);
  }
  getUserData(id:any){
    return this.http.get(`${this.ApiUrl}/user/name/${id}`);
  }

  checkDuplicateEmail(email:string){
    return this.http.get(`${this.ApiUrl}/user/checkDuplicateEmail/${ email }`);
  }

  createplaylist(data:any){
    return this.http.post(`${this.ApiUrl}/playlist/createplaylist`, data)
  }
  
  getUserPlaylist(id:any){
    return this.http.get(`${this.ApiUrl}/playlist/playlist/${id}`);
  }

  deleteplaylist(unique:any){
    return this.http.delete(`${this.ApiUrl}/playlist/deleteplaylist/${unique}`)
  }

  updateplaylist(unique:any,data:any){
    return this.http.patch(`${this.ApiUrl}/playlist/updateplaylist/${unique}`,data)
  }
}
