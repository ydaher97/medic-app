import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpInterceptor, HttpEvent} from '@angular/common/http';

import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthInterService implements HttpInterceptor{

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    if(token){
      const clonedRequest = req.clone(
        {
          headers: req.headers.set("Authorization", "Bearer " + token),
        }
      )
      return next.handle(clonedRequest);

    }else{
      console.log("No token found in localStorage."); // Check if token is present in localStorage
      return next.handle(req);
    }
}}
