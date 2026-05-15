import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const cloneReq = req.clone({
            setHeaders: { Authorization: 'Bearer token'},
        });
        return next.handle( cloneReq);
    }
}