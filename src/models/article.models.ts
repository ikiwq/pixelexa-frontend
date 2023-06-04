import { CategoryModel } from "./category.model";
import { UserModel } from "./user.model";

export class ArticleModel{
    id : number = -1;

    title : string = "";
    content : string = "";
    excerpt: string = "";
    created_at : Date = new Date();

    stars_count : number = 0;
    saves_count : number = 0;
    comments_count : number = 0;
    impressions : number = 0;

    starred : Boolean = false;
    saved : Boolean = false;

    image : string = "";
    categories : CategoryModel[] = [];

    creator : UserModel | null = null;
}

export class ArticleRequest{
    title : string = "";
    content : string = "";
    excerpt : string = "";
    categories : string[] = [];
}

//maps the article id to a specific article model.
export interface ArticleDictionary{
    [key : string] : ArticleModel;
}