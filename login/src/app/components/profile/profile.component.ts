import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user!: User;
  userId!: Pick<User, "id">;
  score: any[] | undefined ;
  constructor(private authService: AuthService,private profileService: ProfileService) { }

  ngOnInit(): void {
    this.userId = this.authService.userId;
    this.authService.getUserProfile(this.userId).subscribe(
      (user: User) => {
        this.user = user;
      },
      (error: any) => {
        console.log('Error fetching user profile:', error);
      }
    );

     this.profileService.fetchAll(this.userId).subscribe((scores) => {
      this.score = scores;
    });

  }
}
