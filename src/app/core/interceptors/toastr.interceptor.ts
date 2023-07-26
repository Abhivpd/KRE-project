import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ToastrNotifierService } from '../services/toastr-notifier.service';

@Injectable()
export class ToastrInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrNotifierService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('toastr');
    return next.handle(request).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.error);
      })
    );

    // return next.handle(req).pipe(
    //   retry(2),
    //   catchError((error: HttpErrorResponse) => {
    //     if (error.status !== 401) {
    //       // 401 handled in auth.interceptor
    //       this.toastr.error(error.message);
    //     }
    //     return throwError(error);
    //   })
    // );
  }
}
