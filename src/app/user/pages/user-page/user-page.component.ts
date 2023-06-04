import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ArticleService } from 'src/app/article/service/article.service';
import { UserService } from 'src/app/user/services/user.service';
import { ArticleDictionary } from 'src/models/article.models';
import { KeywordToIdsDictionary } from 'src/models/uni.model';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit{

  allIndexes : KeywordToIdsDictionary = {}
  allArticles : ArticleDictionary = {};

  constructor(private activatedRoute : ActivatedRoute, private userService : UserService, private articleService : ArticleService){}

  public user : UserModel | null = null;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      let username = params['username'];
      this.userService.getUserByUsername(username).subscribe((user)=>{
          this.user = user;
          this.articleService.retrieveArticlesFromUser(user.username, "POPULAR");
          this.articleService.retrieveArticlesFromUser(user.username, "CREATED_AT");
      });
    })

    this.articleService.getArticleIndexes().subscribe((indexes)=>{
      this.allIndexes = indexes;
    })

    this.articleService.getArticleStorage().subscribe((storage)=>{
      this.allArticles = storage;
    })
  }

  requestPage(){
    if(!this.user) return ;
    this.articleService.retrieveArticlesFromUser(this.user.username, "CREATED_AT");
  }
}
