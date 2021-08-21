import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbAuthOAuth2Token, NbAuthResult, NbAuthService} from "@nebular/auth";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-oauth2-login',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-body>
            <p>Current User Authenticated: {{ !!token }}</p>
            <p>Current User Token: {{ token|json }}</p>
            <button nbButton status="success" *ngIf="!token" (click)="login()">Sign In with Google</button>
            <button nbButton status="warning" *ngIf="token" (click)="logout()">Sign Out</button>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
  styles: []
})
export class Oauth2LoginComponent implements OnDestroy {

  token: any = null;

  private destroy$ = new Subject<void>();

  constructor(private authService: NbAuthService) {
    this.authService.onTokenChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((token: any) => {
        this.token = null;
        if (token && token.isValid()) {
          this.token = token;
        }
      });
  }

  login() {
    this.authService.authenticate('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
      });
  }

  logout() {
    this.authService.logout('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
