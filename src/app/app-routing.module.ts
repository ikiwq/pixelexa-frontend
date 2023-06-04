import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './auth/pages/authentication/authentication.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { UploadComponent } from './article/pages/upload/upload.component';
import { ChatComponent } from './chat/pages/chat/chat.component';
import { ExploreArticlesPageComponent } from './article/pages/explore-articles-page/explore-articles-page.component';
import { SingleArticlePageComponent } from './article/pages/single-article-page/single-article-page.component';
import { UserPageComponent } from './user/pages/user-page/user-page.component';
import { NewHomeComponent } from './shared/pages/new-home/new-home.component';
import { CategoryArticlesPageComponent } from './category/pages/category-articles-page/category-articles-page.component';
import { SearchPageComponent } from './search/pages/search-page/search-page.component';

const routes: Routes = [
  {path: '', component: NewHomeComponent, children:[
    {path: '', component: ExploreArticlesPageComponent}
  ]},
  {path: 'auth', component: AuthenticationComponent, children:[
    {path:'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
  ]},
  {path: 'upload', component: UploadComponent},
  {path: 'chat', component: ChatComponent, children:[
    {path: ':user_tag', children: []},
    {path: '', children: []}
  ]},
  {path: 'article/:article_id', component: SingleArticlePageComponent},
  {path: 'articles', children: [
    {path: 'saved', children: []}
  ]},
  {
    path: 'category/:category', component: CategoryArticlesPageComponent
  },
  {path: 'user/:username', component: UserPageComponent},
  {path: 'search/:search', component: SearchPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
