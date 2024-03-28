import { HTTP_INTERCEPTORS,  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Router } from "@angular/router";
import { Observable} from "rxjs";
import { catchError } from 'rxjs/operators'

import { ErrorService } from "./core/error/error.service";

const URL = "http://localhost://3030/users"

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private router: Router,
        private errorService: ErrorService) { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);

        if (req.url.startsWith('http://localhost:3030') && accessToken) {
            req = req.clone({
                setHeaders: {
                    "X-Authorization": accessToken
                }
            });
        }
        if (!req.headers.has('Content-Type')) {
            req = req.clone({
                setHeaders: {
                    "Content-Type": 'aplication/json'
                }
            });
        }
        return next.handle(req).pipe(
            catchError((err) => {

                if (err.status === 401) {
                    this.router.navigate(['/auth/register'])
                }
                else {
                    this.errorService.setError(err);
                    this.router.navigate(['/error'])
                }

                return [err]
            })

        )
    }
}

export const appInterceptorProvider: Provider = {
    multi: true,
    useClass: AppInterceptor,
    provide: HTTP_INTERCEPTORS
}