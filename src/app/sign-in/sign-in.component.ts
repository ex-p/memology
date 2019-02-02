import { Component, OnInit } from '@angular/core';
import { AuthService, VkontakteLoginProvider } from 'angular-6-social-login-v2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private socialAuthService: AuthService) { }

  ngOnInit() {
  }

  public signIn() {
    this.socialAuthService.signIn(VkontakteLoginProvider.PROVIDER_ID).then(
      (userData) => {
        console.log('Vk sign in data : ' , userData);
      });
  }
}
