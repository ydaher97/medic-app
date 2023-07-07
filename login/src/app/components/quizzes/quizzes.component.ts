import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Observable, Subscription, interval } from 'rxjs';


@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit{
  quizzes: Observable<any[]> | undefined;
  isQuizInProgress: boolean = false;
  selectedQuizId: number | null = null;
  private selectedQuizIdSubscription: Subscription | undefined;

  constructor(private quizService:QuizService){}

  ngOnInit(): void {
    this.quizzes = this.fetchAll();
   /* this.quizService.fetchAll().subscribe((quizzes) => {
      this.quizzes = quizzes;
    })*/
    // this.quizService.isQuizInProgress$.subscribe((isInProgress) => {
    //   this.isQuizInProgress = isInProgress;
    // });

    this.selectedQuizIdSubscription = this.quizService.selectedQuizId$.subscribe((quizId) => {
      this.selectedQuizId = quizId;
    });
  }

  // ngOnDestroy(): void {
  //   if (this.selectedQuizIdSubscription) {
  //     this.selectedQuizIdSubscription.unsubscribe();
  //   }
  // }

  fetchAll(): Observable<any[]>{
    return this.quizService.fetchAll();
  }
}
