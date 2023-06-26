import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Post } from '../models/Post';
import { ErrorHandlerService } from './error-handler.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api/userquiz';


  constructor(private http:HttpClient,private errorHandlerService: ErrorHandlerService) { }

  
  fetchAll(userId:Pick<User, "id">): Observable<any[]>{
    console.log('fetch')
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`,{ responseType: "json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<any[]>("fetchAll", []))
    );
  }
  
}
