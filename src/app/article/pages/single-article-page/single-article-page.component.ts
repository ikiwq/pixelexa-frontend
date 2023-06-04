import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faBookmark, faExclamationTriangle, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { ArticleService } from '../../service/article.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CommentService } from 'src/app/comment/service/comment.service';
import { ArticleModel } from 'src/models/article.models';
import { CategoryModel } from 'src/models/category.model';
import { CommentDictionary, CommentModel } from 'src/models/comment.models';
import { KeywordToIdsDictionary } from 'src/models/uni.model';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-single-article-page',
  templateUrl: './single-article-page.component.html',
  styleUrls: ['./single-article-page.component.scss']
})
export class SingleArticlePageComponent implements OnInit {
  back = faArrowLeft;
  star = faStar;
  bookmark = faBookmark;
  danger = faExclamationTriangle;
  trash = faTrash;

  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService, private location: Location,
    private commentService: CommentService, private authService: AuthService) { }

  article: ArticleModel | undefined = undefined;
  loadingComments: Boolean = false;

  allComments : CommentDictionary = {}
  commentsIndexes : number[] = [];

  correlatedCategories: CategoryModel[] = [];
  correlatedArticles: ArticleModel[] = [];

  currentUser: UserModel | null = null;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      window.scrollTo(0, 0);
      let article_id = params['article_id'];
      this.correlatedArticles = [];
      this.articleService.getArticleById(article_id).then((article) => {
        this.article = article;
        this.commentService.retrieveCommentsFromArticle(article_id);
        this.commentService.getCommentStorage().subscribe((comments) => this.allComments = comments);
        this.commentService.getCommentsIndexes().subscribe((indexes) => this.commentsIndexes = indexes[article_id]);
        this.correlatedCategories = article.categories;
        this.articleService.getSimilarArticles(this.article.title).subscribe((articles) => this.correlatedArticles = articles);
      });
    });
    this.articleService.getLoading().subscribe((bool) => this.loadingComments = bool);
    this.authService.getCurrentUser().subscribe((user) => this.currentUser = user);

  }

  retrieveComments() {
    if (!this.article || this.loadingComments) return;
    this.commentService.retrieveCommentsFromArticle(this.article.id.toString());
  }

  starArticle(event: Event): void {
    if (!this.article) return;
    this.articleService.starArticle(this.article.id.toString());
  }

  goBack(): void {
    this.location.back();
  }

}
