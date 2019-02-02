import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { tokenKey } from '@angular/core/src/view';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get isLoggedIn() {
    return localStorage.getItem('access_token') !== null;
  }
  redirectUrl: string;

  login(userData: any) {
    this.accessToken = userData.token;
    this.userId = userData.id;
  }

  set userId(usedId: string) {
    if (usedId !== null) {
      localStorage.setItem('user_id', usedId);
    } else {
      localStorage.removeItem('user_id');
    }
  }

  get userId() {
    return localStorage.getItem('user_id');
  }

  set accessToken(token: string) {
    if (token !== null) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  }

  get accessToken() {
    return localStorage.getItem('access_token');
  }

  logout(): void {
    this.accessToken = null;
    this.userId = null;
  }
}
