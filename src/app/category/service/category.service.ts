import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CategoryDictionary, CategoryModel } from 'src/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryStorage = new BehaviorSubject<CategoryDictionary>({});

  constructor(private httpClient : HttpClient) { }

  retrievePopularCategories(){
    this.httpClient.get<CategoryModel[]>(`${environment.apiURL}/category/most_popular?page_size=5`).subscribe((categories)=>{
      let storage = this.categoryStorage.value;
      storage["POPULAR"] = categories;
      this.categoryStorage.next(storage);
    })
  }

  getCategoryByName(name : string) : Promise<CategoryModel>{
    return new Promise<CategoryModel>((resolve, reject)=>{
      this.httpClient.get<CategoryModel>(`${environment.apiURL}/category/by_name/${name}`).subscribe((category)=>resolve(category));
    })
  }

  getCategoryStorage(){
    return this.categoryStorage;
  }
}
