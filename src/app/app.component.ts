import {Component, OnDestroy, OnInit} from '@angular/core';

import {takeUntil, tap} from "rxjs/operators";
import {NbAuthJWTToken, NbAuthService} from "@nebular/auth";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'deliver-app';
  private destroy$ = new Subject<void>();
  isAutenticated = false;

  constructor(
    private authService: NbAuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken | any) => {
        this.isAutenticated = false;
        if (token.isValid()) {
          this.authService.isAuthenticated()
            .subscribe(r => {
              this.isAutenticated = r
            })
        }
      })
  }

  logout() {
    this.authService.logout('iron')
      .pipe(takeUntil(this.destroy$),
        tap(() => {
            this.router.navigate(['oauth2']).then();
          }
        ))
      .subscribe(() => {
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
