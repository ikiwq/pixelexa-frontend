import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCloud, faMicrochip, faTrash } from '@fortawesome/free-solid-svg-icons';
import { marked } from 'marked';
import { ArticleService } from '../../service/article.service';
import { ImageService } from 'src/app/shared/service/image/image.service';
import { ArticleRequest } from 'src/models/article.models';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  ai = faMicrochip;
  trash = faTrash;

  constructor( private articleService : ArticleService, private router : Router) { }

  markdownText : string = "";
  isPreviewShown : boolean = false;

  categories : string[] = [];

  public selectedImageFiles : File[] = [];
  public selectedImages : any[] = [];

  public articleForm = new FormGroup({
    title : new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(1)]),
    excerpt : new FormControl('', [Validators.maxLength(350)]),
    content : new FormControl('', [Validators.required, Validators.maxLength(7500), Validators.minLength(20)])
  })

  public categoryForm = new FormGroup({
    name : new FormControl('', [Validators.maxLength(100), Validators.minLength(5)])
  })

  ngOnInit(): void {
  }

  public onFileChanged(event : any) : void {
    this.selectedImageFiles.push(event.target.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.selectedImages.push(reader.result);
    }
  }

  public arrayBufferToBase64(buffer : ArrayBuffer){
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
       binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  deleteArticleImages(){
    this.selectedImageFiles = [];
    this.selectedImages = [];
  }

  togglePreview(){
    if(!this.articleForm.controls.content.value) return ;
    if(!this.isPreviewShown){
      let md = marked.setOptions({headerIds: false, mangle: false});
      this.markdownText = md(this.articleForm.controls.content.value);
    }
    this.isPreviewShown = !this.isPreviewShown;
  }

  addCategory(event : Event) : void {
    let newCategory = this.categoryForm.value?.name;
    if(!newCategory || !this.categoryForm.valid || this.categories.includes(newCategory) || this.categories.length >= 10) return ;

    this.categories.push(newCategory);
    this.categoryForm.controls.name.reset();
  }

  deleteCategory(index : number){
    this.categories.splice(index, 1)
  }

  uploadArticle() : void {
    if(!this.articleForm.valid) return ;
    if(!this.selectedImageFiles[0]) return ;
    
    let formData = new FormData();
    let articleRequest = new ArticleRequest();

    formData.append('image', this.selectedImageFiles[0]);
    
    articleRequest.title = this.articleForm.value.title ?? '';
    articleRequest.content = this.articleForm.value.content ?? '';
    articleRequest.excerpt = this.articleForm.value.excerpt ?? '';
    articleRequest.categories = this.categories;

    formData.append('data', JSON.stringify(articleRequest));

    this.articleService.uploadArticle(formData);

    this.router.navigate(['/']);
  }

}
