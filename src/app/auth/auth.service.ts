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
    return this.isTokenValid(this.accessToken);
  }
  redirectUrl: string;

  isTokenValid(myRawToken) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(myRawToken);
    const expirationDate = helper.getTokenExpirationDate(myRawToken);
    const isExpired = helper.isTokenExpired(myRawToken);
    console.log(decodedToken);
    return !isExpired;
  }
  login(myRawToken: string) {
    this.accessToken = myRawToken;
  }

  set accessToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  get accessToken() {
    return localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }
}
