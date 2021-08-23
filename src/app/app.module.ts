import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbThemeModule, NbLayoutModule, NbUserModule, NbActionsModule} from '@nebular/theme';


import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./auth.interceptor";
import {
  NbAuthModule,
  NbAuthOAuth2Token,
  NbOAuth2AuthStrategy, NbOAuth2ResponseType,
} from "@nebular/auth";
import {NbEvaIconsModule} from "@nebular/eva-icons";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbUserModule,
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
    NbActionsModule,
    NbEvaIconsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
