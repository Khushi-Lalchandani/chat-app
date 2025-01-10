import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoginMode: boolean = false;
  isPasswordVisible: boolean = false;
  error: string = '';
  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      fname: new FormControl(null),
      lname: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit() {
    console.log(this.form);
    this.router.navigate(['/user']);

    const value = this.form.value;

    if (this.isLoginMode) {
      this.authService
        .logInFirebase({
          email: value.email,
          password: value.password,
        })

        .subscribe(
          (data) => {
            this.error = '';
            this.authService.loggedIn = true;
            this.router.navigate(['/blogs']);
          },
          (error) => {
            this.error = error.error.error.message;
            this.router.navigate(['/auth']);
            console.log(error);
          }
        );
    } else {
      this.authService
        .signUpFirebase({
          email: value.email,
          password: value.password,
        })
        .subscribe(
          (data) => {
            this.authService
              .signUp({
                fname: value.fname,
                lname: value.lname,
                email: value.email,
                password: value.password,
              })
              .subscribe((sample) => {
                console.log(sample, 'added successfully');
                window.location.reload();
              });
          },
          (error) => {
            if (error) {
              this.error = error.error.error.message;
              console.log(this.error);
            }
          }
        );
    }
    this.form.reset();
  }

  constructor(private router: Router, private authService: AuthService) {}
}
