import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { User } from '../models/User';
 
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, first} from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:3000/api/quizzes';


  constructor(private http:HttpClient,private errorHandlerService: ErrorHandlerService) { }

  
  

  fetchAll(): Observable<any[]>{
    console.log('fetch')
    return this.http.get<any[]>(this.apiUrl,{ responseType: "json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<any[]>("fetchAll", []))
    );
  }


  getQuestion(questionId: string) {
    return this.http.get<any>(`http://localhost:3000/api/question/${questionId}`);
  }


  getQuestions() : Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/questions`,{ responseType: "json"}).pipe(
      catchError(this.errorHandlerService.handleError<any[]>("fetchAll", []))
    );
  }
}
 
  
