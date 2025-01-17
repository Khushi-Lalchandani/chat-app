import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { UserProfile } from '../user/user.model';

export interface returnType {
  email: string;
  idToken: string;
  returnSecureToken?: boolean;
  localId: string;
  expiresIn: string;
  registered: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  tokenExpirationTimer: any;
  // userLoggedIn = new BehaviorSubject<any>(null);

  signUpFirebase(
    email: string,
    password: string,
    returnSecureToken: boolean = true
  ) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDsil2lX3n2-JgW2td21LzqbN_bk7-SXac',
      { email, password, returnSecureToken }
    );
  }
  logInFirebase(
    email: string,
    password: string,
    returnSecureToken: boolean = true
  ) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDsil2lX3n2-JgW2td21LzqbN_bk7-SXac',
      { email, password }
    );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');

    this.router.navigate(['/login']);
  }
  nextUser = new BehaviorSubject<any>({ email: 'kl@gmail.com  ' });

  setUser(value: any, login: string) {
    this.nextUser.next(value);
    localStorage.setItem('user', value.email);
    localStorage.setItem('isLoggedIn', login);
  }

  constructor(private http: HttpClient, private router: Router) {}
}
