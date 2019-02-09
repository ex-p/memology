import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { tokenKey } from '@angular/core/src/view';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get isLoggedIn() {
    return this.accessToken && this.isTokenValid(this.accessToken);
  }
  redirectUrl: string;

  isTokenValid(myRawToken) {
    try {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(myRawToken);
      const expirationDate = helper.getTokenExpirationDate(myRawToken);
      const isExpired = helper.isTokenExpired(myRawToken);
      return !isExpired;
    } catch (e) {
      return false;
    }
  }
  login(accessToken, refreshToken) {
    console.log('logging with: ' + accessToken);
    this.accessToken = accessToken;
    this.refresh = refreshToken;
  }

  set accessToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  get accessToken() {
    return localStorage.getItem('access_token');
  }

  set refresh(token: string) {
    localStorage.setItem('refresh', token);
  }

  get refresh() {
    return localStorage.getItem('refresh');
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh');
  }
}
