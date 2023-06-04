import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faChartBar } from '@fortawesome/free-regular-svg-icons';
import { faBookmark, faChartArea, faComment, faStar } from '@fortawesome/free-solid-svg-icons';
import { ArticleService } from '../../service/article.service';
import { ArticleModel } from 'src/models/article.models';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  star = faStar;
  save = faBookmark;
  comment = faComment;
  chart = faChartBar;

  @Input() article : ArticleModel | null = null;
  
  constructor(private articleService : ArticleService, private router : Router){}

  starArticle(event : Event){
    if(!this.article) return ;
    this.articleService.starArticle(this.article.id.toString());
    event.stopPropagation();
  }

  redirectToUser(event : Event){
    if(!this.article || !this.article.creator) return ;
    this.router.navigate(['user', this.article.creator.username])
    event.stopPropagation();
  }
  
}
