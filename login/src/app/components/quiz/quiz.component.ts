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
  //questions!: Observable<any[]>;
  questionsList: any[]= [];
 // questions: Observable<any[]> | undefined;
 //question: any;
  remainingTime:number = 10;
  timer = interval(1000);
  subscription: Subscription [] = []
  correctAnswerCount: number = 0;

constructor(private quizService:QuizService){}

ngOnInit(): void {
 // this.questions = this.fetchAll();
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
/*
fetchAll(): Observable<any[]>{
  return this.quizService.getQuestions();
}*/

finish() {
     this.isQuizEnded = true;
     this.isQuizStarted = false;  
     this.subscription.forEach(element => {
      element.unsubscribe();
    })
  }

  showWarningPopup(){
    this.showWarning = true;
  }

  replay(){
    this.showWarning =false;
    this.isQuizStarted = true;
    this.isQuizEnded = false;
    this.currentQuestionNo = 0;
    this.timer = interval(1000);
  
    for (const question of this.questionsList) {
      for (const option of question.answers) {
        option.isSelected = false;
      }
    }
    this.correctAnswerCount = 0;
    this.subscription.push(this.timer.subscribe(res => {
      console.log(res);
      if(this.remainingTime != 0){
        this.remainingTime --;
      }
      if(this.remainingTime == 0 ){
        this.nextbtn();
        
      }
      
    }))
  }
  

  start(){
    this.showWarning = false;
    this.isQuizStarted = false;
    this.isQuizEnded = false;
    this.currentQuestionNo = 0;


  
    for (const question of this.questionsList) {
      for (const option of question.answers) {
        option.isSelected = false;
      }
    }
    this.correctAnswerCount = 0;
    this.remainingTime = 10;
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
        
      }
      
    }))
  }

  nextbtn(){
    if(this.currentQuestionNo < this.questionsList.length-1){
      this.currentQuestionNo ++;
   } 
   this.remainingTime = 10;
  }

 selectOption(option: any){
    if(option.is_correct) {
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


