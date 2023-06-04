import { Component, OnInit } from '@angular/core';
import { DarkModeService } from './shared/service/dark-mode/dark-mode.service';
import { AuthService } from './auth/service/auth.service';
import { ChatService } from './chat/service/chat.service';
import { ArticleService } from './article/service/article.service';
import { CategoryService } from './category/service/category.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private darkModeService : DarkModeService, private authService : AuthService, private articleService : ArticleService,
      private chatService : ChatService, private categoryService : CategoryService){}

  ngOnInit(): void {
    this.authService.retrieveCurrentUser();
    this.initDarkMode();
    this.chatService.init();
    this.categoryService.retrievePopularCategories();
  }

  initDarkMode(){
    this.darkModeService.checkForDarkModeInStorage();
    this.articleService.retrieveArticles("POPULARITY", "NONE", "BOTTOM", 40);
    this.articleService.retrieveArticles("CREATED_AT", "NONE", "BOTTOM");
  }
}
