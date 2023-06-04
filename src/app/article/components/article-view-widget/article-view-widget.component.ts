import { Component, Input, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { ArticleDictionary, ArticleModel } from 'src/models/article.models';

@Component({
  selector: 'app-article-view-widget',
  templateUrl: './article-view-widget.component.html',
  styleUrls: ['./article-view-widget.component.scss']
})
export class ArticleViewWidgetComponent{
  star = faStar;

  @Input() highlightFirst : boolean = false;
  @Input() extend : Boolean = false;

  @Input()
  set articleIndexes(value : number[]){
    if(this.highlightFirst){
      if(!value || value.length <= 0) return ;
      this.main_article_index = value[0];
      this.article_indexes = value.slice(1, value.length);
      return ;
    }
    this.article_indexes = value;
  }
  @Input() articles : ArticleDictionary = {}
  
  article_indexes : number[] = []
  main_article_index : number = -1;

  @Input()
  set articlesObjects(value : ArticleModel[]){
    if(value && value.length > 0){
      for(let article of value){
        this.articles[article.id] = article;
        this.article_indexes.push(article.id);
      }
    }

    if(this.highlightFirst){
      if(!value || value.length <= 0) return ;
      this.main_article_index = this.article_indexes[0];
      this.article_indexes = this.article_indexes.slice(1, value.length);
      return ;
    }
  }

  constructor(){}
}
