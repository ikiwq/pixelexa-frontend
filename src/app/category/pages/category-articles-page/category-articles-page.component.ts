import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from 'src/models/category.model';
import { ArticleDictionary } from 'src/models/article.models';
import { ArticleService } from 'src/app/article/service/article.service';

@Component({
  selector: 'app-category-articles-page',
  templateUrl: './category-articles-page.component.html',
  styleUrls: ['./category-articles-page.component.scss']
})
export class CategoryArticlesPageComponent implements OnInit{

  loading : Boolean = false;

  public category_name : string | null= "";
  public category : CategoryModel | null = null;

  public allArticles : ArticleDictionary = {};
  public allIndexes : number[] = [];

  recentIndexes : number[] = [];
  popularIndexes : number[] = [];

  constructor(private categoryService : CategoryService, private articleService : ArticleService, private activatedRoute : ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>{
      this.category_name = params.get('category');
      if(!this.category_name) return ;
      
      this.articleService.getArticleStorage().subscribe((articles)=>{
        this.allArticles = articles;
      });

      this.categoryService.getCategoryByName(this.category_name).then((category)=>{
        this.category = category;
        this.articleService.retrieveArticles('CREATED_AT', this.category.name, "BOTTOM");
        this.articleService.retrieveArticles('POPULAR', this.category.name, "BOTTOM");
      })

      this.articleService.getArticleIndexes().subscribe((indexes)=>{
        if(!this.category_name) return;
        this.recentIndexes = indexes[this.category_name.toUpperCase() + '-CREATED_AT'] ?? [];
        this.popularIndexes = indexes[this.category_name.toUpperCase() + '-POPULAR'] ?? [];
      })
    })

    this.articleService.getLoading().subscribe((bool)=>this.loading = bool);
  }

  requestPage(event : Event){
    if(!this.category || this.loading) return;
    this.articleService.retrieveArticles('CREATED_AT', this.category.name, "BOTTOM");
  }
}
