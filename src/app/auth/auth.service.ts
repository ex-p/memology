import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { tokenKey } from '@angular/core/src/view';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  redirectUrl: string;

  login(userData: any) {
    this.access_token = userData.token;
    this.isLoggedIn = true;
  }

  set access_token(token: string) {
    if (token !== null) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  }

  get access_token() {
    return localStorage.getItem('access_token');
  }

  logout(): void {
    this.access_token = null;
    this.isLoggedIn = false;
  }
}
