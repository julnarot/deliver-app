import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Oauth2RoutingModule} from './oauth2-routing.module';
import {Oauth2LoginComponent} from './oauth2-login.component';
import {Oauth2CallbackComponent} from './oauth2-callback.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NbButtonModule, NbCardModule, NbLayoutModule} from "@nebular/theme";


@NgModule({
  declarations: [
    Oauth2LoginComponent,
    Oauth2CallbackComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NbCardModule,
    NbLayoutModule,
    Oauth2RoutingModule,
    NbButtonModule,
  ],
})
export class Oauth2Module {
}
