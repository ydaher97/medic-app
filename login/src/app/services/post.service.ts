import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { User } from '../models/User';
 
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, first} from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/posts';


  constructor(private http:HttpClient,private errorHandlerService: ErrorHandlerService) { }

  

  addPost(formData:Partial <Post>,userId: Pick<User, "id">): Observable<Post> {
    console.log({title: formData.title, body: formData.body, user: userId})
    return this.http.post<Post>(this.apiUrl, {title: formData.title, body: formData.body, user: userId}, httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Post>("addPost"))
    );
  }

  fetchAll(): Observable<Post[]>{
    console.log('fetch')
    return this.http.get<Post[]>(this.apiUrl,{ responseType: "json"})
    .pipe(
      catchError(this.errorHandlerService.handleError<Post[]>("fetchAll", []))
    );
  }

 
  

  deletePost(post: number): Observable<{}>{
    console.log(post)
    return this.http.delete<Post>(`${this.apiUrl}/${post}`,httpOptions)
    .pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Post>("deletePost"))
    );
  }


}
