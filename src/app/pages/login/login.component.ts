import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatsnackbarService } from 'src/app/service/matsnackbar.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  responseMessage:any
  LoginForm!:FormGroup
  

  constructor(private router:Router,private formbuilder:FormBuilder,private userservice:UserService,
    private service:MatsnackbarService,private ngxLoader:NgxUiLoaderService ) { }

  ngOnInit(): void {
    this.LoginForm = this.formbuilder.group({
      email:[null,[Validators.required]],
      password:[null,[Validators.required]]
    })
  }

  OnSubmit() {
    if (this.LoginForm.valid) {
      this.ngxLoader.start();
      this.userservice.Login(this.LoginForm.value).subscribe(
        (result: any) => {
          localStorage.setItem('token', result.token);
          this.responseMessage = result?.message;
          this.service.open(this.responseMessage, "succcess");
          this.router.navigate(['']);
          this.ngxLoader.stop();
        },
        (error) => {
          if (error.error?.message) {
            this.responseMessage = error.error.message;
          } else {
            this.responseMessage = "Something went wrong. Please try again later.";
          }
          this.service.open(this.responseMessage, "error");
          this.ngxLoader.stop();
        }
      );
    } else {
      this.LoginForm.markAllAsTouched();
      return;
    }
  }
  
  
  Signup(){
    this.ngxLoader.start();
    this.router.navigate(['/signup'])
    this.ngxLoader.stop();
  }


}
