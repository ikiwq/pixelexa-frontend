import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleDictionary } from 'src/models/article.models';

@Component({
  selector: 'app-vertical-article-view',
  templateUrl: './vertical-article-view.component.html',
  styleUrls: ['./vertical-article-view.component.scss']
})
export class VerticalArticleViewComponent {
  @Input() articles : ArticleDictionary = {};
  @Input() articlesIndexes : number[] = [];
}
