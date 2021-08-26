import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "./auth-guard.service";

export const routes: Routes = [

  {
    path: 'pages',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  }, {
    path: 'oauth2',
    // canActivate: [AuthGuardService],
    loadChildren: () => import('./oauth2/oauth2.module')
      .then(m => m.Oauth2Module),
  }, {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: 'pages'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
