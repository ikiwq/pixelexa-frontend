import { ArticleModel } from "./article.models";
import { UserModel } from "./user.model";

export class CommentModel{
    id : number  = -1;

    article_id : number = -1;

    text : string = "";
    created_at : Date = new Date();

    votes_count : number = 0;
    upvoted : Boolean = false;
    downvoted : Boolean = false;

    user : UserModel | null = null;
}

export class CommentRequest{
    text : string = "";
    article_id : string = "-1";
}

export interface CommentDictionary{
    [key : string] : CommentModel;
}