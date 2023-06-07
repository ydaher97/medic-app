import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../models/User';
import {BehaviorSubject, Observable} from 'rxjs';
import { first, catchError,tap} from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId!: Pick<User,"id">;

  constructor(private http: HttpClient,private errorHandlerService: ErrorHandlerService,
    private router: Router) { }
  private apiUrl = 'http://localhost:3000/api/auth';

  signup(user: Omit<User ,"id">): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/signup`, user,httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>("signup"))
    );
    
  } 


  login(email: Pick<User, "email">, password: Pick<User, "password">): Observable<{ token: string; userId: Pick<User, "id"> }> {
  return this.http.post(`${this.apiUrl}/login`, { email, password }, httpOptions)
    .pipe(
      first(),
      tap((tokenObject: { token: string; userId: Pick<User, "id"> }| any  ) => {
        this.userId = tokenObject.userId;
        console.log(this.userId)
        localStorage.setItem("token", tokenObject.token);
        this.isUserLoggedIn$.next(true);
        this.router.navigate(["posts"]);
      }),
      catchError(this.errorHandlerService.handleError<{
        token: string; userId: Pick<User, "id">
      }>("login"))
    );
}

}
