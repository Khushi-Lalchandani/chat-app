import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';

export interface credentials {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  loggedIn: boolean = false;
  tokenExpirationTimer: any;
  userLoggedIn = new BehaviorSubject<any>(null);

  signUpFirebase(user: {
    email: string;
    password: string;
    returnSecureToken: boolean;
  }) {
    return this.http.post<credentials>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDsil2lX3n2-JgW2td21LzqbN_bk7-SXac',
      user
    );
  }
  logInFirebase(user: {
    email: string;
    password: string;
    returnSecureToken: boolean;
  }) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBeBysRqu5nJa_wSdI1OHFiXcN15dSBjZo',
      user
    );
    // .pipe(
    //   map((response) => {
    //     const expiresIn = 3600000;

    //     this.tokenExpirationTimer = setTimeout(() => {
    //       this.logout();
    //     }, expiresIn);
    //     return response;
    //   })
    // );
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
  constructor(private http: HttpClient, private router: Router) {}
}
