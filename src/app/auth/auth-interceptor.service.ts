import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { first, switchMap } from "rxjs/operators";

import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthService);

    return auth.getToken$().pipe(
      first(),
      switchMap((token) => {
        if (token && !req.headers.has("Authorization")) {
          req = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${token}`),
          });
        }
        return next.handle(req);
      })
    );
  }
}
