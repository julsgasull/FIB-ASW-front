import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseUserService } from '../core/user.service';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    
    if (request.headers.has(InterceptorSkipHeader)) {
      const headers = request.headers.delete(InterceptorSkipHeader);
      return next.handle(request.clone({ headers }));
    } 
    else {
      const firebaseUserService = this.injector.get(FirebaseUserService);
      var token;
      firebaseUserService.getCurrentUser().then(
        user=> {
          user.getIdToken(true).then(idToken => { token = idToken; })
        }
      )
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`,
        }
      });
      return next.handle(request);
    }
  }
}