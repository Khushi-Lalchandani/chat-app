import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  loggedIn: boolean = false;
  tokenExpirationTimer: any;

  signUp(user: {
    fname: string;
    lname: string;
    email: string;
    password: string;
  }) {
    return this.http.post(
      'https://chitchat-28450-default-rtdb.firebaseio.com/',
      user
    );
  }

  signUpFirebase(user: { email: string; password: string }) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDsil2lX3n2-JgW2td21LzqbN_bk7-SXac',
      user
    );
  }
  logInFirebase(user: { email: string; password: string }) {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBeBysRqu5nJa_wSdI1OHFiXcN15dSBjZo',
        user
      )
      .pipe(
        map((response) => {
          const expiresIn = 3600000;

          this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
          }, expiresIn);
          return response;
        })
      );
  }
  getAllUsers() {
    return this.http.get('https://chitchat-28450-default-rtdb.firebaseio.com/');
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
    this.router.navigate(['/auth']);
    localStorage.removeItem('isLoggedIn');
  }
  constructor(private http: HttpClient, private router: Router) {}
}
