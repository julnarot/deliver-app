import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Oauth2RoutingModule} from './oauth2-routing.module';
import {Oauth2LoginComponent} from './oauth2-login.component';
import {Oauth2CallbackComponent} from './oauth2-callback.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {
  NbAuthModule,
  NbAuthOAuth2Token,
  NbOAuth2AuthStrategy,
  NbOAuth2GrantType,
  NbOAuth2ResponseType
} from "@nebular/auth";
import {NbButtonModule, NbCardModule, NbLayoutModule} from "@nebular/theme";
import {AuthGuardService} from "../auth-guard.service";


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
        /*NbOAuth2AuthStrategy.setup({
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
        }),*/
        NbOAuth2AuthStrategy.setup({
          name: 'iron',
          baseEndpoint: 'http://127.0.0.1:8000/o/',
          clientId: "kYLNG8SZzw6aTclbSwNgsvcQdiltjmos9fgmDvxF",
          clientSecret: "cnfnLMfofgMWewqzyUjy6LVYwrIo09bs814hrYmcARUsb2Zi74J8GmZbqBr2T4cIuIf8qiGrJq8dKdTmvw6KMry58g83JMsKWrtpTcOayYQSSKUc9YRu0iYfmkjbZoEp",
          authorize: {
            // endpoint: 'http://127.0.0.1:8000/o/authorize/',
            responseType: NbOAuth2ResponseType.CODE,
            scope: 'read write',
            redirectUri: 'http://localhost:4200/oauth2/callback',
          }, token: {
            endpoint: 'token/',
            // grantType: NbOAuth2GrantType.AUTHORIZATION_CODE,
            // requireValidToken: true,
            class: NbAuthOAuth2Token,
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
    NbButtonModule,
  ],
  providers: [
    // AuthGuardService,
  ]
})
export class Oauth2Module {
}
