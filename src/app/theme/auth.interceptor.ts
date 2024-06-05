import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";

import {  Router } from "@angular/router";
import { AuthService } from "../services/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService , private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.isAuth()) {
            const token = this.auth.token;
            if (token !== null) {
                req = req.clone({
                    setParams: {
                        auth: token
                    }
                });
            }
        }
        return next.handle(req)
            .pipe(
                tap(() => {
                    console.log('intercept')
                }),
                catchError((error: HttpErrorResponse) => {
                    console.log('interceptorError', error)
                    if (error.status === 401){
                        this.auth.logOut()
                        this.router.navigate(['/admin','/login'])
                    }
                    return throwError(error)
                })  
            );
    }
}