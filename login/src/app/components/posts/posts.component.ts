import { Component ,OnInit} from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import {Observable,of} from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit
{
  posts: Observable<Post[]> | undefined;
  userId!: Pick<User, "id">;

  constructor(private postService:PostService,private authService:AuthService){}

  ngOnInit(): void {
   
    this.posts = this.fetchAll();
    this.userId = this.authService.userId;
    console.log(this.userId);

  }
  

  fetchAll(): Observable<Post[]>{
    return this.postService.fetchAll();
  }

  createPost():void{
    this.posts = this.fetchAll();
    console.log(this.posts);
  }


  delete(postId: number): void{
    console.log(postId);
    this.postService.deletePost(postId).subscribe(() => (this.posts = this.fetchAll()));
     

  }

}
