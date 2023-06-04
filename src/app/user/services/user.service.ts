import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { UserModel } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }

  getUsersByUsername(username : string){
    return this.httpClient.get<UserModel[]>(environment.apiURL + '/auth/get_users_by_username/' + username);
  }

  getUserByUsername(username : string){
    return this.httpClient.get<UserModel>(environment.apiURL + '/auth/get_user_by_username/' + username);
  }

}
