import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  questions: any[]=[];

  constructor(private quizService:QuizService) { }

  ngOnInit(): void {

    this.quizService.getQuestions().subscribe(
      (response) => {
        this.questions = response;
        console.log(this.questions);
      },
      (error) => {
        console.error('An error occurred while fetching the question:', error);
      }
    );
  }
}
