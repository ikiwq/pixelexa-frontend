import { Component, Input, OnInit } from '@angular/core';
import { CommentDictionary } from 'src/models/comment.models';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.scss']
})
export class CommentViewComponent{

  @Input() comments : CommentDictionary = {}
  @Input() commentsIndexes : number[] = [];

  constructor(){}
}
