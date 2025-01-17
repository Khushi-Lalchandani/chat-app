import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

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
  submit() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit() {
    console.log(this.form);

    const value = this.form.value;

    if (this.isLoginMode) {
      this.authService
        .logInFirebase(value.email, value.password, true)
        .subscribe(
          (data) => {
            this.error = '';
            this.authService.setUser(value);
            this.authService.loggedIn = true;
            console.log('succesful', data);
            this.router.navigate(['/user'], { relativeTo: this.route });
          },
          (error) => {
            this.error = error.error.error.message;
            console.log(this.error);
          }
        );
    }
    if (!this.isLoginMode) {
      this.authService
        .signUpFirebase(value.email, value.password, true)
        .subscribe(
          (data) => {
            this.error = '';
            this.authService.loggedIn = true;
            console.log('signed up', data);
            this.authService.setUser(value);

            this.authService.loggedIn = true;
            this.router.navigate(['/user'], { relativeTo: this.route });
          },
          (error) => {
            this.error = error.error.error.message;
            console.log(this.error);
          }
        );
    }
    // this.form.reset();
  }
  constructor(
    private router: Router,
    private uService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}
}
