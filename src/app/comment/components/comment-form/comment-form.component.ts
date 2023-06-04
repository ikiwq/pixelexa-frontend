import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CommentService } from '../../service/comment.service';
import { CommentRequest } from 'src/models/comment.models';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit{

  send = faPaperPlane;

  constructor(private authService : AuthService, private commentService : CommentService){}
  
  @Input() article_id : number = -1;

  currentUser : UserModel | null = null;

  commentForm = new FormGroup({
    message : new FormControl('', [Validators.required, Validators.maxLength(250)])
  })

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user)=>{
      this.currentUser = user;
    })
  }

  sendComment(event : Event) : void {
    if(!this.commentForm.valid || !this.commentForm.controls.message.value) return ;

    let commentRequest = new CommentRequest();
    commentRequest.text = this.commentForm.controls.message.value;

    this.commentService.uploadComment(commentRequest, this.article_id.toString());
    this.commentForm.controls.message.reset();
  }
}
