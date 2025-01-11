import { UserProfile } from './../user/user.model';
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
    console.log(this.isLoginMode);

    const value = this.form.value;

    if (this.isLoginMode) {
      if (this.searchUser(value)) {
        this.uService.nextUser.next(value);
        console.log(value);
        this.router.navigate(['/user'], { relativeTo: this.route });
      }
    }
  }
  searchUser(value: any) {
    return this.uService.users.some(
      (data) => data.email === value.email && data.password === value.password
    );
  }
  constructor(
    private router: Router,
    private uService: UserService,
    private route: ActivatedRoute
  ) {}
}
