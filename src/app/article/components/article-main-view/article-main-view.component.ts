import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleDictionary } from 'src/models/article.models';

@Component({
  selector: 'app-article-main-view',
  templateUrl: './article-main-view.component.html',
  styleUrls: ['./article-main-view.component.scss']
})
export class ArticleMainViewComponent implements OnInit{
  @Input() articles : ArticleDictionary = {};
  @Input() articlesIndexes : number[] = [];

  ngOnInit(): void {

  }
}
