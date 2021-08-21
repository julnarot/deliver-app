import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {NbAuthResult, NbAuthService} from "@nebular/auth";
import {Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-oauth2-callback',
  template: `
    <nb-layout>
      <nb-layout-column>Authenticating...</nb-layout-column>
    </nb-layout>
  `,
  styles: [
  ]
})
export class Oauth2CallbackComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(private authService: NbAuthService, private router: Router) {
    this.authService.authenticate('iron')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
        if (authResult.isSuccess() && authResult.getRedirect()) {
          this.router.navigateByUrl(authResult.getRedirect());
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
