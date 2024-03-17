import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable } from "rxjs";

const URL="http://localhost://3030/users"

@Injectable()
export class AppInterceptor implements HttpInterceptor {
   intercept(
    req: HttpRequest<any>, 
    next: HttpHandler
    ): Observable<HttpEvent<any>> {
       if (req.url.startsWith('/api')) {
        req=req.clone ({
            url: req.url.replace ('/api', URL),
            withCredentials: true,
        });
       }

       return next.handle(req)
    }
}

export const appInterceptorProvider: Provider = {
    multi: true,
    useClass: AppInterceptor,
    provide:HTTP_INTERCEPTORS
}