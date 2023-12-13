import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatsnackbarService } from 'src/app/service/matsnackbar.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  currentStep: number = 1; // Start at the first step (1)
  form: FormGroup;
  totalSteps: number = 3;
  responseMessage:any;
  buttonClicked = false;
  emailExists = false;

  constructor(private fb: FormBuilder,private router:Router,private service:UserService,
    private ngxLoader:NgxUiLoaderService,private servicee:MatsnackbarService,
    private serviceee:MatsnackbarService ) {
    this.form = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      DOB: ['', Validators.required],
      gender: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }


  getProgressWidth(): string {
    return (this.currentStep / this.totalSteps) * 100 + '%';
  }

  Login(){
    this.ngxLoader.start()
    this.router.navigate(['login']);
    this.ngxLoader.stop();
  }

  Onsubmit(){
    debugger
      this.ngxLoader.start();
      this.service.register(this.form.value).subscribe((result:any) => {
        console.log(result)
        this.responseMessage = result?.message;
        this.serviceee.open(this.responseMessage, "succcess");
        this.router.navigate(['login'])
        this.ngxLoader.stop();
      },(error) => {
          if (error.error?.message) {
            this.responseMessage = error.error.message;
          } else {
            this.responseMessage = "Something went wrong. Please try again later.";
          }
          this.servicee.open(this.responseMessage, "error");
          this.ngxLoader.stop();
        }
      );
  }

  nextStep() {
    this.buttonClicked = true;
    this.checkEmailExists();
  }

  checkEmailExists() {
    debugger
    if (this.form) {
      const emailControl = this.form.get('email');
      if (emailControl) {
        const email = emailControl.value;
        this.service.checkDuplicateEmail(email).subscribe(
          (data: any) => {
            this.emailExists = data.exists;
            if (!this.emailExists) {
              if (this.currentStep < this.totalSteps) {
                this.currentStep++;
              }
            } else {
              this.servicee.open("Email already exists. Please use a different email.", "error");
            }
          },
          (error) => {
            console.error('Error checking email existence:', error);
          }
        );
      }
    }
  }
}