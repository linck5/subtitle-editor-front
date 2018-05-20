import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if(this.authService.isTokenSet()){
      const authReq = req.clone({ setHeaders: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      } });

      return next.handle(authReq);
    }
    else{
      return next.handle(req);
    }


  }
}
