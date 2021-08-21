import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Oauth2RoutingModule} from './oauth2-routing.module';
import {Oauth2LoginComponent} from './oauth2-login.component';
import {Oauth2CallbackComponent} from './oauth2-callback.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NbAuthModule, NbOAuth2AuthStrategy, NbOAuth2ResponseType} from "@nebular/auth";
import {NbCardModule, NbLayoutModule} from "@nebular/theme";


@NgModule({
  declarations: [
    Oauth2LoginComponent,
    Oauth2CallbackComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'google',
          clientId: '614871923849-q19aj577124qi1ipva5fi89l20v8r7ef.apps.googleusercontent.com',
          clientSecret: 'pVfJgi2DU_Au5-J09zaz5L3pQQ',
          authorize: {
            endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            responseType: NbOAuth2ResponseType.TOKEN,
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
            redirectUri: 'http://localhost:4200/oauth2/callback',
          },

          redirect: {
            success: '/pages',
          },
        }),
      ],
    }),
    NbCardModule,
    NbLayoutModule,
    Oauth2RoutingModule,
  ],
})
export class Oauth2Module {
}
