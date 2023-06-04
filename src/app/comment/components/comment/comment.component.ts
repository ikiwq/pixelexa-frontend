import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowDown, faArrowUp, faExclamationTriangle, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CommentService } from '../../service/comment.service';
import { CommentModel } from 'src/models/comment.models';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{
  arrowUp = faArrowUp;
  arrowDown = faArrowDown;
  danger = faExclamationTriangle;
  trash = faTrash;
  star = faStar;

  @Input() comment : CommentModel = new CommentModel();

  currentUser : UserModel | null = null;

  constructor(private authService : AuthService, private commentService : CommentService, private router : Router){}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user)=>this.currentUser = user);
  }

  upvoteComment(){
    if(!this.currentUser){
      this.router.navigate(['auth', 'login']);
      return ;
    }
    if(!this.comment) return ;
    
    this.commentService.upvoteComment(this.comment.id.toString());
  }

  downvoteComment(){
    if(!this.currentUser){
      this.router.navigate(['auth', 'login']);
      return ;
    }
    if(!this.comment) return ;

    this.commentService.downvoteComment(this.comment.id.toString());
  }

  reportComment(){
    
  }

  deleteItem(){
    this.commentService.deleteComment(this.comment.id, this.comment.article_id);
  }
}
