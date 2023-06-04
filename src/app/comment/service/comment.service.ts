import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CommentDictionary, CommentModel, CommentRequest } from 'src/models/comment.models';
import { KeywordToIdsDictionary } from 'src/models/uni.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  //Behaviour Subject to map a specific comment to its ID.
  commentStorage = new BehaviorSubject<CommentDictionary>({});
  //Maps a key word to an array of ids. In this case, we will map
  //a list of comments to their article ID.
  commentMap = new BehaviorSubject<KeywordToIdsDictionary>({});

  page_size = 10;
  //Keeps track of whether we are loading or not.
  isLoading = new BehaviorSubject<Boolean>(false);
  //Keeps track of whether we have more items to retrieve from the server or not.
  noElementsLeft : {[key: string] : number} = {

  }
  //Keeps tracks of the comments' cursor for every article.
  cursors : {[key : string] : number} = {

  }

  constructor(private httpClient : HttpClient) { }

  //adds an item to the storage. The function takes in a comments array, an article id and a position.
  addItemsToStorage(comments : CommentModel[], article_id: string = "-1", position : string = "-1"){
    //First, we will take the values from the Behaviour Subject containing all the replies
    let newStorage = this.commentStorage.value;
    let comments_ids : number[] = []; //array to save all the new replies id.

    comments.forEach((comment)=>{
      newStorage[comment.id] = comment;
      comments_ids.push(comment.id);
    })

    if(article_id != "-1" && position != "-1") this.addIndexesToStorage(comments_ids, article_id, position);
    
    this.commentStorage.next(newStorage);
  }

  addIndexesToStorage(comments_ids : number[], article_id: string, position: string){
    //take the values from the articleMap
    let newStorage = this.commentMap.value;
    //if there isn't yet an array for a specific article, create it.
    if(!newStorage[article_id]){
      newStorage[article_id] = [];
    }

    if(position == "TOP"){
      //Push the values depending on the given position
      newStorage[article_id] = [...comments_ids, ...newStorage[article_id]]
    }else if(position == "BOTTOM"){
      newStorage[article_id] = [...newStorage[article_id], ...comments_ids]
    }

    this.commentMap.next(newStorage);
  }

  retrieveCommentsFromArticle(article_id : string){
    //if there are no elements left or are we still loading, then just return.
    if(this.noElementsLeft[article_id] == 1 || this.isLoading.value) return ;
    let cursor = this.cursors[article_id] ?? -1;
    this.isLoading.next(true);
    this.httpClient.get<CommentModel[]>(`${environment.apiURL}/comment/get/${article_id}?cursor=${cursor}&page_size=${this.page_size}`)
      .subscribe({
        next: (newPosts) => { 
          if(newPosts.length == 0){
            this.noElementsLeft[article_id] = 1; //if the request has returned no new comments, this means there are no more elements to retrieve.
            return ;
          }
          this.addItemsToStorage(newPosts, article_id, "BOTTOM"); //add the items to the storage.
          this.cursors[article_id] = newPosts[newPosts.length - 1].id; //save the cursor with the last item in the list.
        },
        complete: ()=> this.isLoading.next(false) // once completed, the loading is complete.
      });
  }

  getCommentStorage(){
    return this.commentStorage;
  }

  getCommentsIndexes(){
    return this.commentMap;
  }

  uploadComment(commentRequest : CommentRequest, article_id : string) : void{
    this.httpClient.post<CommentModel>(`${environment.apiURL}/comment/create/${article_id}`, commentRequest).subscribe({
      next: (comment)=>{
        this.addItemsToStorage([comment], article_id, "TOP");
      }
    })
  }

  upvoteComment(comment_id : string) : void {
    this.httpClient.get(`${environment.apiURL}/comment/upvote/${comment_id}`, {responseType: "text"}).subscribe({
      next: (res)=>{
        let comments = this.commentStorage.value;
        if(comments[comment_id].upvoted){
          comments[comment_id].upvoted = false;
          comments[comment_id].votes_count -= 1;
        }else if(comments[comment_id].downvoted){
          comments[comment_id].downvoted = false;
          comments[comment_id].upvoted = true;
          comments[comment_id].votes_count += 2;
          return ;
        }else{
          comments[comment_id].upvoted = true;
          comments[comment_id].votes_count += 1;
        }
        this.commentStorage.next(comments);
      }
    })
  }

  downvoteComment(comment_id : string) : void {
    this.httpClient.get(`${environment.apiURL}/comment/upvote/${comment_id}`, {responseType: "text"}).subscribe({
      next: (res)=>{
        let comments = this.commentStorage.value;
        if(comments[comment_id].upvoted){
          comments[comment_id].upvoted = false;
          comments[comment_id].downvoted = true;
          comments[comment_id].votes_count -= 2;
        }else if(comments[comment_id].downvoted){
          comments[comment_id].downvoted = false;
          comments[comment_id].votes_count += 1;
        }else{
          comments[comment_id].downvoted = true;
          comments[comment_id].votes_count -= 1;
        }
        this.commentStorage.next(comments);
      }
    })
  }

  deleteComment(comment_id : number, article_id : number) : void{
    this.httpClient.get(`${environment.apiURL}/comment/delete/${comment_id}`, {responseType: "text"}).subscribe({
      next: (res)=>{
        //take the commentMap value.
        let new_map = this.commentMap.value;
        //find where the comment is inside comments' ids array.
        const index = new_map[article_id].indexOf(comment_id);
        if(index > -1){
          //if the index is valid, remove the element it is pointing at
          new_map[article_id].splice(index, 1);
        }

        this.commentMap.next(new_map);
      }
    })
  }
}
