import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        // 'Content-Type': 'application/json; charset=utf-8',
        // 'Accept': 'application/json',
        authorization: `Bearer ${this.getTokenValue()}`
      },
    });
    return next.handle(request);
  }

  getTokenValue(): any {
    const disk: any = localStorage.getItem("auth_app_token");
    if (disk) {
      return JSON.parse(JSON.parse(disk)['value'])['access_token']
    } else {
      return '';
    }
  }
}
