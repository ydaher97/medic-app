import { Component, ViewChild ,EventEmitter,Output} from '@angular/core';
import {FormControl,FormGroup, NgForm, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { Post } from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  isOpen: boolean = false;

  @ViewChild("formDirective")
  formDirective!: NgForm;


  @Output() createPost: EventEmitter<any> = new EventEmitter();

  postForm: FormGroup = new FormGroup({});


  constructor(private authService: AuthService,private postService:PostService){}
  
  ngOnInit(): void {
      this.postForm = this.createFormGroupe();
      
  }

  createFormGroupe():FormGroup{
    return new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(4)]),
      body: new FormControl("", [Validators.required, Validators.minLength(10)])

    });

  }

  post(formData: Pick<Post, "title" | "body">): void{
    this.postService.addPost(formData,this.authService.userId).pipe(first()).subscribe(( )=> {
      this.createPost.emit(null);
    })
    
    this.postForm.reset();
    this.formDirective.resetForm();
    //this.authService.post(this.postForm.value.title,this.postForm.value.body).subscribe();
  }
}
