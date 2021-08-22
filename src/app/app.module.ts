import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbThemeModule, NbLayoutModule, NbUserModule} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';

import {HeaderComponentComponent} from './header-component/header-component.component';
import {AuthGuardService} from "./auth-guard.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./auth.interceptor";
import {NbAuthModule, NbAuthService, NbTokenLocalStorage, NbTokenService, NbTokenStorage} from "@nebular/auth";

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
    NbUserModule,
    HttpClientModule,
    NbAuthModule
  ],
  providers: [
    AuthGuardService,
    {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
