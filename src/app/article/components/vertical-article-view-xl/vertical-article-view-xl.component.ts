import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleDictionary } from 'src/models/article.models';

@Component({
  selector: 'app-vertical-article-view-xl',
  templateUrl: './vertical-article-view-xl.component.html',
  styleUrls: ['./vertical-article-view-xl.component.scss']
})
export class VerticalArticleViewXlComponent{
  @Input() articles : ArticleDictionary = {};
  @Input() articlesIndexes : number[] = [];
}
