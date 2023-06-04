import { Component } from '@angular/core';;
import { ArticleService } from '../../service/article.service';
import { CategoryService } from 'src/app/category/service/category.service';
import { ArticleDictionary } from 'src/models/article.models';
import { CategoryModel } from 'src/models/category.model';

@Component({
  selector: 'app-explore-articles-page',
  templateUrl: './explore-articles-page.component.html',
  styleUrls: ['./explore-articles-page.component.scss']
})
export class ExploreArticlesPageComponent {
  allArticles : ArticleDictionary = {};
  allIndexes : { [key: string] : number[] } = {};
  
  categories : CategoryModel[] = [];

  staticArticlesId : { [key: string] : number[]} = {
    "first-row" : [],
    "second-row" : [],
    "recent" : [],
  }
  generatedArticlesId: { [key: string] : number[]} = {

  }

  loading: Boolean = false;

  constructor(private articleService: ArticleService, private categoryService : CategoryService) { }

  ngOnInit(): void {
    this.articleService.getArticleStorage().subscribe((storage) => {
      this.allArticles = storage;
    });

    this.articleService.getArticleIndexes().subscribe((indexes) => {
      if(indexes["NONE-CREATED_AT"]){
        this.staticArticlesId["RECENT"] = indexes["NONE-CREATED_AT"].slice(0, 5);
      }
      
      if(indexes["NONE-POPULARITY"]){
        this.staticArticlesId["first-row"] = indexes["NONE-POPULARITY"].slice(0, 5);
        this.staticArticlesId["second-row"] = indexes["NONE-POPULARITY"].slice(5, 8);

        let c = 0;
        for(let i=8; i < indexes["NONE-POPULARITY"].length; i += 3){
          this.generatedArticlesId[c + "-ROW"] = indexes["NONE-POPULARITY"].slice(i, i + 3);
          c++;
        }
      }
    })

    this.articleService.getLoading().subscribe((bool) => { this.loading = bool });

    this.categoryService.getCategoryStorage().subscribe((storage)=>{
      this.categories = storage["POPULAR"];
      if(!this.categories) return;

      for(let category of this.categories){
        this.articleService.retrieveArticles("POPULAR", category.name, "BOTTOM");
      }
    });

    this.articleService.getArticleIndexes().subscribe((indexes)=>{
      this.allIndexes = indexes;
    })
  }
}
