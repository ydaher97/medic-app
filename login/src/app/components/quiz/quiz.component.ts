import { Component, OnInit,Input , Output,EventEmitter } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit{
  @Input() quiz!:any;

  showWarning: boolean = false;
  isQuizStarted:boolean =false;
  isQuizEnded: boolean = false;
  currentQuestionNo: number = 0;
  questionsList: any[]= [];
 // quizzes: Observable<any[]> | undefined;
 question: any;
  remainingTime:number = 10;
  timer = interval(1000);
  subscription: Subscription [] = []
  correctAnswerCount: number = 0;

constructor(private quizService:QuizService){}

ngOnInit(): void {
  
  this.quizService.getQuestions().subscribe(
    (response) => {
      this.questionsList = response;
      console.log(this.questionsList);
    },
    (error) => {
      console.error('An error occurred while fetching the question:', error);
    }
  );
}

finish() {
     this.isQuizEnded = true;
     this.isQuizStarted = false;  
  }

  showWarningPopup(){
    this.showWarning = true;
  }

  startQuiz(){
    this.showWarning =false;
    this.isQuizStarted = true;
    this.isQuizEnded = false;
    this.subscription.push(this.timer.subscribe(res => {
      console.log(res);
      if(this.remainingTime != 0){
        this.remainingTime --;
      }
      if(this.remainingTime == 0 ){
        this.nextbtn();
        this.remainingTime = 10;
      }
      
    }))
  }

  nextbtn(){
    if(this.currentQuestionNo < this.questionsList.length-1){
      this.currentQuestionNo ++;
      this.remainingTime = 10;

   }else{
    this.subscription.forEach(element => {
      element.unsubscribe();
    })
   }
  }

 selectOption(option: any){
    if(option.isCorrect) {
          this.correctAnswerCount ++;
         }
        option.isSelected = true;
     }



     isOptionSelected(options: any) {
         const selectionCount = options.filter((m:any)=>m.isSelected == true).length;
         if(selectionCount == 0) {
          return false;
        } else {
          return true;
         }
       }

}


