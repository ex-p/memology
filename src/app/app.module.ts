import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MemComponent } from './mem/mem.component';

import {
  SocialLoginModule,
  AuthServiceConfig,
  VkontakteLoginProvider,
} from 'angular-6-social-login-v2';

export function getAuthServiceConfigs() {
  return new AuthServiceConfig(
    [
      {
        id: VkontakteLoginProvider.PROVIDER_ID,
        provider: new VkontakteLoginProvider('6844263')
      },
    ]);
}

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    MemComponent
  ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
