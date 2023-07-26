import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('inside auth interceptor');
    const token: any = localStorage.getItem('token');
    if (token !== sessionStorage.getItem('token')) {
      console.log(this.authService.token, 'service');
      console.log(token, 'storage');
      setTimeout(() => {
        this.router.navigate(['']);
      }, 200);
    }

    const modifiedRequest = request.clone({
      params: new HttpParams().set('auth', token),
    });
    return next.handle(modifiedRequest);
  }
}
