import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
      if (request.method === 'GET') {
        const updatepRequest = request.clone({
          setHeaders: {
            'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
            Pragma: 'no-cache',
            Expires: '0'
          }
        });

        return next.handle(updatepRequest);

      }
      return next.handle(request);

    }

}
