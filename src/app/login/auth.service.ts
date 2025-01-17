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
  loggedIn: boolean = false;
  tokenExpirationTimer: any;
  userLoggedIn = new BehaviorSubject<any>(null);

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
    this.loggedIn = false;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  nextUser = new BehaviorSubject<any>({ email: 'kl@gmail.com  ' });

  setUser(value: any) {
    this.nextUser.next(value);
    localStorage.setItem('user', value.email);
  }

  constructor(private http: HttpClient, private router: Router) {}
}
