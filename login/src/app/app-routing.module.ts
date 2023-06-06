import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizzesComponent } from './components/quizzes/quizzes.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"posts", component:PostsComponent, canActivate:[AuthGuardService]},
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  {path:"quizzes", component:QuizzesComponent,canActivate:[AuthGuardService]},

  {path:"**", redirectTo:""},
  
];
//,canActivate:[AuthGuardService]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
