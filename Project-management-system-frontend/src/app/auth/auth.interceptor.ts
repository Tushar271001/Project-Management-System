// import { HttpInterceptorFn } from '@angular/common/http';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };


import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { StorageService } from './storage/storage.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private service:StorageService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.service.getToken();
    if(token!=null){
      authReq = authReq.clone({setHeaders:{Authorization:`Bearer ${token}`}});
    }
    
    return next.handle(authReq);
  }

}

export const authInterceptor=[
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }
];
