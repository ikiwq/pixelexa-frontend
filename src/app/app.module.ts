import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LateralNavbarComponent } from './shared/components/lateral-navbar/lateral-navbar.component';
import { TopNavbarComponent } from './shared/components/top-navbar/top-navbar.component';
import { HomeComponent } from './shared/pages/home/home.component';
import { AuthenticationComponent } from './auth/pages/authentication/authentication.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { WithCredentialsInterceptor } from './auth/interceptors/WithCredentialsInterceptor';
import { UploadComponent } from './article/pages/upload/upload.component';
import { ChatComponent } from './chat/pages/chat/chat.component';
import { MessageViewComponent } from './shared/components/message-view/message-view.component';
import { ChatFormComponent } from './chat/components/chat-form/chat-form.component';
import { ChatProfileViewComponent } from './chat/components/chat-profile-view/chat-profile-view.component';
import { ChatsListViewComponent } from './chat/components/chats-list-view/chats-list-view.component';
import { MainNavbarComponent } from './shared/components/main-navbar/main-navbar.component';
import { ArticlesViewComponent } from './article/components/articles-view/articles-view.component';
import { ExploreArticlesPageComponent } from './article/pages/explore-articles-page/explore-articles-page.component';
import { ArticleCardComponent } from './article/components/article-card/article-card.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { SingleArticlePageComponent } from './article/pages/single-article-page/single-article-page.component';
import { CommentFormComponent } from './comment/components/comment-form/comment-form.component';
import { CommentViewComponent } from './comment/components/comment-view/comment-view.component';
import { CommentComponent } from './comment/components/comment/comment.component';
import { CategoryTagComponent } from './category/components/category-tag/category-tag.component';
import { PaginationObserverComponent } from './shared/components/pagination-observer/pagination-observer.component';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user/pages/user-page/user-page.component';
import { UserOverviewComponent } from './user/components/user-overview/user-overview.component';
import { NavbarMenuComponent } from './shared/components/navbar-menu/navbar-menu.component';
import { SwitchComponent } from './shared/components/switch/switch.component';
import { CategoriesViewComponent } from './category/components/categories-view/categories-view.component';
import { ArticleViewWidgetComponent } from './article/components/article-view-widget/article-view-widget.component';
import { NewHomeComponent } from './shared/pages/new-home/new-home.component';
import { VerticalArticleViewXlComponent } from './article/components/vertical-article-view-xl/vertical-article-view-xl.component';
import { ArticleCardXlComponent } from './article/components/article-card-xl/article-card-xl.component';
import { HorizontalArticleViewComponent } from './article/components/horizontal-article-view/horizontal-article-view.component';
import { ArticleMainViewComponent } from './article/components/article-main-view/article-main-view.component';
import { CategoryArticlesPageComponent } from './category/pages/category-articles-page/category-articles-page.component';
import { VerticalArticleViewComponent } from './article/components/vertical-article-view/vertical-article-view.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { SearchPageComponent } from './search/pages/search-page/search-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LateralNavbarComponent,
    TopNavbarComponent,
    HomeComponent,
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
    UploadComponent,
    ChatComponent,
    MessageViewComponent,
    ChatFormComponent,
    ChatProfileViewComponent,
    ChatsListViewComponent,
    MainNavbarComponent,
    ArticlesViewComponent,
    ExploreArticlesPageComponent,
    ArticleCardComponent,
    DateAgoPipe,
    SingleArticlePageComponent,
    CommentFormComponent,
    CommentViewComponent,
    CommentComponent,
    CategoryTagComponent,
    PaginationObserverComponent,
    UserPageComponent,
    UserOverviewComponent,
    NavbarMenuComponent,
    SwitchComponent,
    CategoriesViewComponent,
    ArticleViewWidgetComponent,
    NewHomeComponent,
    VerticalArticleViewXlComponent,
    ArticleCardXlComponent,
    HorizontalArticleViewComponent,
    ArticleMainViewComponent,
    CategoryArticlesPageComponent,
    VerticalArticleViewComponent,
    LoadingComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: WithCredentialsInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
