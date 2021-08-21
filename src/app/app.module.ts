import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbThemeModule, NbLayoutModule, NbUserModule} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {HttpClientModule} from "@angular/common/http";
import {
  NbAuthJWTToken,
  NbAuthModule,
  NbOAuth2AuthStrategy,
  NbOAuth2ResponseType,
  NbPasswordAuthStrategy
} from "@nebular/auth";
import {HeaderComponentComponent} from './header-component/header-component.component';
import {AuthGuardService} from "./auth-guard.service";

const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbEvaIconsModule,
    HttpClientModule,
    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'auth',
          clientId: 'MlaYaEfhCjoQJvGJx7rDEruIgafIM6xgA4cfLhAh',
          clientSecret: 'jqPuQJzlr2KDJPCPjOpWF5NX6ASZy7RbEnNyAG3T2bgAbVHasf8fNahg1w0sYTyOHfFfwGtNlhzghJ7MyDh4nvby9MVxuZjg1bMTsBUIu651PjuiqfHdgQKN2igQoK0F',
          authorize: {
            endpoint: '',
            responseType: NbOAuth2ResponseType.TOKEN,
            scope: '',
          }
        }),
      ],
      forms: {
        login: formSetting,
        register: formSetting,
        requestPassword: formSetting,
        resetPassword: formSetting,
        logout: {
          redirectDelay: 0,
        },
      },
    }),
    NbUserModule,
  ],
  providers: [
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
