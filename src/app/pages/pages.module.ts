import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PagesComponent} from "./pages.component";
import {PagesRoutingModule} from "./pages-routing.module";
import {AuthGuardService} from "../auth-guard.service";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import {HttpClientModule} from "@angular/common/http";
import {Oauth2RoutingModule} from "../oauth2/oauth2-routing.module";
import {NbAuthService, NbOAuth2AuthStrategy, NbTokenService} from "@nebular/auth";
import {NbCardModule, NbUserModule} from "@nebular/theme";




@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NbEvaIconsModule,
    HttpClientModule,
    Oauth2RoutingModule,
    NbUserModule,
    NbCardModule
  ],
  providers: [
    NbAuthService,
    AuthGuardService,
    NbOAuth2AuthStrategy,
    NbAuthService,
    NbTokenService

  ]
})
export class PagesModule { }
