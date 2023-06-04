import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient : HttpClient) { }

  retrieveStylizedImage(formData : FormData){
    return this.httpClient.post(environment.apiURL + '/image/stylized_image/', formData, {responseType: 'arraybuffer'});
  }
}
