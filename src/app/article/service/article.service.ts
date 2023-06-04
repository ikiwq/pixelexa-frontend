import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { marked } from 'marked';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ArticleDictionary } from 'src/models/article.models';
import { ArticleModel } from 'src/models/article.models';
import { KeywordToIdsDictionary } from 'src/models/uni.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  //Behaviour Subject to map a specific article to its ID.
  articleStorage = new BehaviorSubject<ArticleDictionary>({});
  //Maps a key word to an array of ids. Ex: reccomended -> [1,5,8,10]
  articleMap = new BehaviorSubject<KeywordToIdsDictionary>({});
  //Keeps track of whether we are loading or not.
  isLoading = new BehaviorSubject<Boolean>(false);

  constructor(private httpClient : HttpClient) { }

  //Since the app will use cursor pagination, we will make a map to store every cursor we need.
  //We could take the id of the last (or first) element of an article array, 
  //but I've found that this is way more handy.
  cursors : {[key : string] : number} = {}

  //Keeps track of whether we have more elements to retrieve or not.
  //This is useful to avoid useless requests to the server.
  noElementsLeft : {[key : string] : number} = {}

  elaborateMarkdownContent(markdown_content : string){
    //Since the user could write html content inside the markdown content, we 
    //will remove it with a regex.
    let regex = /(<([^>]+)>)/ig;
    markdown_content = markdown_content.replace(regex, "")

    //finally, we will elaborate the content and return it.
    let md = marked.setOptions({mangle: false, headerIds: false});
    return md.parse(markdown_content);
  }

  //adds an item to the storage. The function takes in an article array, a category and a position.
  addItemsToStorage(articles : ArticleModel[], category: string = "reccomended", position : string = "TOP"){
    //First, we will take the values from the Behaviour Subject containing all the articles
    let newStorage = this.articleStorage.value;
    let articles_id : number[] = []; //array to save all the new articles id.

    articles.forEach((article)=>{

      if(!article.excerpt || article.excerpt.length == 0){
        // if we don't have an excerpt for the article, we will make one by taking
        // the first 350 characters.
        article.excerpt = article.content.slice(0, 350);
      }
      //The article content will be in markdown format.
      //This function will convert markdown format to html.
      article.content = this.elaborateMarkdownContent(article.content);

      newStorage[article.id] = article;
      articles_id.push(article.id);

    })

    //if an argument for the category and a position is provided, we can proceed to
    //add the ids to our articleMap
    if(category !== "-1" && position !== "-1") this.addIndexesToStorage(articles_id, category, position);

    this.articleStorage.next(newStorage);
  }

  addIndexesToStorage(article_ids : number[], category: string, position: string){
    //take the values from the articleMap
    let newStorage = this.articleMap.value;
    //if there isn't yet an array for a specific category, create it.
    if(!newStorage[category]){
      newStorage[category] = [];
    }

    if(category == "ALL"){
      //TODO : add to all categories
      //I haven't implemented it since it is quite useless
    }else{
      //avoid duplicates inside the same category
      article_ids = article_ids.filter((id)=>newStorage[category].indexOf(id) == -1);

      //Push the values depending on the given position
      if(position == "TOP"){
        newStorage[category] = [...article_ids, ...newStorage[category]]
      }else if(position == "BOTTOM"){
        newStorage[category] = [...newStorage[category], ...article_ids]
      }
    }
    
    this.articleMap.next(newStorage);
  }

  retrieveArticles(sort : string =  "CREATED_AT", category : string = "NONE", put_to : string = "BOTTOM", page_size : number = 20) {
    let query = category.toUpperCase() + "-" + sort.toUpperCase()
    //if there are no elements left or are we still loading, then just return.
    if(this.noElementsLeft[query]) return ;
    if(!this.cursors[query]) this.cursors[query] = -1;
    this.isLoading.next(true); //Set loading to true to prevent multiple simultaneous requests
    this.httpClient.get<ArticleModel[]>(`${environment.apiURL}/article?order=${sort}&cursor=${this.cursors[query]}&page_size=${page_size}&category=${category}`)
      .subscribe({
        next: (newArticles) => { 
          if(newArticles.length == 0){
            this.noElementsLeft[query] = 1; //if the request has returned no new articles, this means there are no more elements to retrieve.
            return ;
          }
          this.cursors[query] = newArticles[newArticles.length - 1].id; //save the cursor with the last item in the list.
          this.addItemsToStorage(newArticles, query, put_to); //add the items to the storage.
        },
        complete: ()=> this.isLoading.next(false) // once completed, the loading is complete.
      });
  }

  retrieveArticlesFromUser(username : string, sort : string = "CREATED_AT", put_to : string = "BOTTOM", page_size : number = 20){
    let query = username.toUpperCase() + "-" + sort.toUpperCase()
    if(this.noElementsLeft[query]) return ;
    if(!this.cursors[query]) this.cursors[query] = -1;
    this.isLoading.next(true);
    this.httpClient.get<ArticleModel[]>(`${environment.apiURL}/article?order=${sort}&cursor=${this.cursors[query]}&page_size=${page_size}&user=${username}`)
      .subscribe({
        next: (newArticles) => { 
          if(newArticles.length == 0){
            this.noElementsLeft[query] = 1; //if the request has returned no new articles, this means there are no more elements to retrieve.
            return ;
          }
          this.cursors[query] = newArticles[newArticles.length - 1].id; //save the cursor with the last item in the list.
          this.addItemsToStorage(newArticles, query, put_to); //add the items to the storage.
        },
        complete: ()=> this.isLoading.next(false) // once completed, the loading is complete.
      });
  }

  retrieveSimilarArticles(title : string, sort : string =  "CREATED_AT", put_to : string = "BOTTOM", page_size : number = 20) {
    let query = title.toUpperCase() + "-SIMILAR-" + sort.toUpperCase();
    //if there are no elements left or are we still loading, then just return.
    if(this.noElementsLeft[query]) return ;
    if(!this.cursors[query]) this.cursors[query] = -1;
    this.isLoading.next(true); //Set loading to true to prevent multiple simultaneous requests
    this.httpClient.get<ArticleModel[]>(`${environment.apiURL}/article/similar?title=${title}&cursor=${this.cursors[query]}`)
      .subscribe({
        next: (newArticles) => { 
          if(newArticles.length == 0){
            this.noElementsLeft[query] = 1; //if the request has returned no new articles, this means there are no more elements to retrieve.
            return ;
          }
          
          this.cursors[query] = newArticles[newArticles.length - 1].id; //save the cursor with the last item in the list.
          this.addItemsToStorage(newArticles, query, put_to); //add the items to the storage.
        },
        complete: ()=> this.isLoading.next(false) // once completed, the loading is complete.
      });
  }

  getSimilarArticles(title : string){
    return this.httpClient.get<ArticleModel[]>(`${environment.apiURL}/article/similar?title=${title}`);
  }

  getArticleStorage(){
    return this.articleStorage;
  }

  getArticleIndexes(){
    return this.articleMap;
  }

  getLoading(){
    return this.isLoading;
  }

  getArticleById(article_id : string) : Promise<ArticleModel>{
    let values = this.articleStorage.value;

    //If a specific component requests an article, we don't always need
    //to retrieve it from the server. It could be already present
    //in the articleStorage.
    //By using promises, we can check if a specific article is already present.
    if(values[article_id]){
      return new Promise<ArticleModel>((resolve, reject)=>resolve(values[article_id]));
    }

    //If not, then retrieve it, add it to the storage and finally return it.
    return new Promise<ArticleModel>((resolve, reject) => {
      this.httpClient.get<ArticleModel>(`${environment.apiURL}/article/id/${article_id}`).subscribe({
        next: (newPost) => {this.addItemsToStorage([newPost]); resolve(this.articleStorage.value[article_id]);},
        error: (err)=>{reject(undefined)}
      })
    })
  }

  starArticle(id : string){
    this.httpClient.get(`${environment.apiURL}/interaction/star_article/${id}`, {responseType: "text"}).subscribe({
      next: (res)=>{
        let newValues = this.articleStorage.value;

        if(newValues[id].starred){
          newValues[id].stars_count -= 1;
        }else{
          newValues[id].stars_count += 1;
        }
        newValues[id].starred = !newValues[id].starred;

        this.articleStorage.next(newValues);
      }
    })
  }

  deleteArticle(article_id : string){

  }

  uploadArticle(formData : FormData){
    this.httpClient.post<ArticleModel>(`${environment.apiURL}/article/create/`, formData).subscribe((post)=>{
      this.addItemsToStorage([post], "reccomended", "TOP");
      this.addItemsToStorage([post], "recent", "TOP");
    });
  }
}
