import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatButtonModule} from "@angular/material/button"
import {MatCardModule} from "@angular/material/card"
import {MatIconModule} from "@angular/material/icon"
import {MatInputModule} from "@angular/material/input"
import {MatListModule} from "@angular/material/list"
import {MatToolbarModule} from "@angular/material/toolbar";

import { NavigationComponent } from './components/navigation/navigation.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component'
import { AuthInterService } from './services/auth-inter.service';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizzesComponent } from './components/quizzes/quizzes.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { MainProfileComponent } from './components/main-profile/main-profile.component';
import { TopWidgetsComponent } from './components/top-widgets/top-widgets.component';
import { TopUsersComponent } from './components/top-users/top-users.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PostsComponent,
    CreatePostComponent,
    QuizComponent,
    QuizzesComponent,
    ProfileComponent,
    ProfileHeaderComponent,
    MainProfileComponent,
    TopWidgetsComponent,
    TopUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterService,
     multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
