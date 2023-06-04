import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/article/service/article.service';
import { ArticleDictionary } from 'src/models/article.models';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  search : string = "";
  allArticles : ArticleDictionary = {}

  popularIndexes : number[] = [];
  recentIndexes : number[] = [];

  constructor(private actiatedRoute: ActivatedRoute, private articleService : ArticleService) { }

  ngOnInit(): void {
    this.actiatedRoute.paramMap.subscribe((params) => {
      this.search = params.get("search") ?? '';
      if (this.search == '') return;
      this.articleService.retrieveSimilarArticles(this.search, "CREATED_AT", "BOTTOM", 20);
      this.articleService.retrieveSimilarArticles(this.search, "POPULAR", "BOTTOM", 20);
    })

    this.articleService.getArticleStorage().subscribe((articles)=>{
      this.allArticles = articles;
    })

    this.articleService.getArticleIndexes().subscribe((indexes)=>{
      if(this.search == '' || !indexes[this.search.toUpperCase() + "-SIMILAR-" + "POPULAR"] || 
        !indexes[this.search.toUpperCase() + "-SIMILAR-" + "CREATED_AT"]) return;     
      this.popularIndexes = indexes[this.search.toUpperCase() + "-SIMILAR-" + "POPULAR"];
      this.recentIndexes = indexes[this.search.toUpperCase() + "-SIMILAR-" + "CREATED_AT"];
    })
  }

  requestPage(){
    this.articleService.retrieveSimilarArticles(this.search, "CREATED_AT", "BOTTOM", 20);
  }
}
