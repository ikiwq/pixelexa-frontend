import { Component, Input } from '@angular/core';
import { faBookmark, faChartBar, faComment, faStar } from '@fortawesome/free-solid-svg-icons';
import { ArticleModel } from 'src/models/article.models';
import { ArticleService } from '../../service/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-card-xl',
  templateUrl: './article-card-xl.component.html',
  styleUrls: ['./article-card-xl.component.scss']
})
export class ArticleCardXlComponent {
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

