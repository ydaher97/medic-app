import { Component } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Observable, Subscription, interval } from 'rxjs';


@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent {
  quizzes: Observable<any[]> | undefined;


  constructor(private quizService:QuizService){}

  ngOnInit(): void {
    this.quizzes = this.fetchAll();
   /* this.quizService.fetchAll().subscribe((quizzes) => {
      this.quizzes = quizzes;
    })*/
  }

  fetchAll(): Observable<any[]>{
    return this.quizService.fetchAll();
  }
}
