import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleDictionary } from 'src/models/article.models';

@Component({
  selector: 'app-articles-view',
  templateUrl: './articles-view.component.html',
  styleUrls: ['./articles-view.component.scss']
})
export class ArticlesViewComponent implements OnInit{
  @Input() articlesObs : Observable<ArticleDictionary> = new Observable();
  @Input() articlesIndexesObs : Observable<number[]> = new Observable();

  articles : ArticleDictionary = {};
  articlesIndexes : number[] = [];

  ngOnInit(): void {
    this.articlesObs.subscribe((val)=>this.articles = val);
    this.articlesIndexesObs.subscribe((val)=>this.articlesIndexes = val);
  }
}
