import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NbAuthService} from "@nebular/auth";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  _token = 'joaiwefsd';

  constructor(private authService: NbAuthService) {
    this.authService.getToken().toPromise().then((r: any) => {
      this._token = r.token.access_token;
    })
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        // 'Content-Type': 'application/json; charset=utf-8',
        // 'Accept': 'application/json',
        // 'Authorization': `Bearer ${this._token}`,
        // 'Content-Type': 'application/json',
        authorization: `Bearer ${this._token}`
      },
    });
    return next.handle(request);
  }
}
