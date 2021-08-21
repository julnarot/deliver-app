import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Oauth2LoginComponent} from "./oauth2-login.component";
import {Oauth2CallbackComponent} from "./oauth2-callback.component";

const routes: Routes = [
  {
    path: '',
    component: Oauth2LoginComponent,
  },
  {
    path: 'callback',
    component: Oauth2CallbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Oauth2RoutingModule { }
