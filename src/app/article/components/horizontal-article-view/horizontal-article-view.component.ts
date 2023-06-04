import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleDictionary } from 'src/models/article.models';

@Component({
  selector: 'app-horizontal-article-view',
  templateUrl: './horizontal-article-view.component.html',
  styleUrls: ['./horizontal-article-view.component.scss']
})
export class HorizontalArticleViewComponent implements OnInit{
  @Input() articles: ArticleDictionary = {}
  @Input() articlesIndexes: number[] = [];

  @Input() highlightFirst: Boolean = false;
  @Input() articlesInRow: number = 4;

  ngOnInit(): void {
  }
}
