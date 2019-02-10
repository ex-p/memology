import {Component, OnInit} from '@angular/core';
import {AuthService as SocialAuthService, VkontakteLoginProvider} from 'angular-6-social-login-v2';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {ServerService} from '../server.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    public WarningMessage: string = null;

    constructor(private socialAuthService: SocialAuthService,
                private authService: AuthService,
                private http: HttpClient,
                private server: ServerService,
                private router: Router) {
    }

    ngOnInit() {
    }

    public signIn() {
        this.socialAuthService.signIn(VkontakteLoginProvider.PROVIDER_ID).then(u =>
            this.server.requestToken(u).subscribe(e => {
                this.WarningMessage = e.toString();
                if (e['error'] !== null) {
                    this.WarningMessage = e['error'];
                } else {
                    if (this.authService.login(e['access_token'], e['refresh'])) {
                        this.router.navigate(['']);
                    } else {
                        this.WarningMessage = e['Ошибка авторизации'];
                    }
                }
            }));
    }

}
