import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from './auth/auth.service';
import {RequestOptions} from '@angular/http';
import {AuthInterceptor} from './interceptors/auth.service';


@Injectable({
    providedIn: 'root'
})
export class ServerService {

    private serverAddress = 'https://memoser.herokuapp.com/';

    constructor(private http: HttpClient, private cookieService: CookieService) {
    }

    public requestToken(userData) {
        const data = {
            'user': userData,
            'cookies': this.cookieService.get('vk_app_' + 6844263)
        };
        return this.http.post(this.serverAddress + 'request_token', data);
    }

    public updateToken(refresh) {
        const data = {
            'refresh': refresh
        };
        return this.http.post(this.serverAddress + 'api/token/refresh/', data);
    }

    public loadMems() {
        return this.http.get(this.serverAddress + 'mems');
    }


}
