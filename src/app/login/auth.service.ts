import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';

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

  private lStorage(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  isAuthenticated(): boolean {
    localStorage.setItem('isLoggedIn', `${this.loggedIn}`);
    return this.loggedIn;
  }
  logout() {
    this.loggedIn = false;
    this.router.navigate(['/login']);
    localStorage.removeItem('isLoggedIn');
  }
  nextUser = new BehaviorSubject<any>({ email: 'kl@gmail.com' });

  setUser(value: any) {
    this.nextUser.next(value);
  }
  constructor(private http: HttpClient, private router: Router) {}
}
