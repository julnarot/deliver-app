import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PagesComponent} from "./pages.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent
}];

@NgModule({
  declarations: [],
  imports: [

    RouterModule.forChild(routes)
  ]
})
export class PagesRoutingModule { }
