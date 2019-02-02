import { Component, OnInit } from '@angular/core';
import { AuthService as SocialAuthService, VkontakteLoginProvider } from 'angular-6-social-login-v2';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private socialAuthService: SocialAuthService, private authService: AuthService) { }

  ngOnInit() {
  }

  public signIn() {
    this.socialAuthService.signIn(VkontakteLoginProvider.PROVIDER_ID).then(
      (userData) => {
        console.log(userData);
        this.authService.login(userData);
      });
  }
}
