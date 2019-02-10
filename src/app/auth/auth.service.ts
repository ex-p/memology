import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {tap, delay} from 'rxjs/operators';
import {tokenKey} from '@angular/core/src/view';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ServerService} from '../server.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private server: ServerService) {
    }

    get isLoggedIn() {
        return this.accessToken && this.isTokenValid(this.accessToken);
    }

    isTokenValid(myRawToken) {
        try {
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(myRawToken);
            const expirationDate = helper.getTokenExpirationDate(myRawToken);
            let isExpired = helper.isTokenExpired(myRawToken);
            if (isExpired) {
                this.server.updateToken(this.refresh).subscribe(e => {
                    this.accessToken = e['access'];
                    isExpired = helper.isTokenExpired(this.accessToken);
                });
            }
            return !isExpired;
        } catch (e) {
            return false;
        }
    }

    login(accessToken, refreshToken) {
        if (this.isTokenValid(accessToken)) {
            this.accessToken = accessToken;
            this.refresh = refreshToken;
            return true;
        }
        return false;
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
