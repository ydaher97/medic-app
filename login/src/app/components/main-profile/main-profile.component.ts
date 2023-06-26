import { Component, Input } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.css']
})
export class MainProfileComponent {
  quizzes: Observable<any[]> | undefined ;
  quizList: any[] = [];
  @Input() score: any;
  


constructor(private quizService: QuizService) {}

ngOnInit(): void {
  this.quizzes = this.quizService.fetchAll();
  this.quizzes.subscribe((res) => {
    this.quizList = res;
  });
  console.log(this.score)
}

}
