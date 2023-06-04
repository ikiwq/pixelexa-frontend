import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthResponse, LoginPayload } from 'src/models/auth.models'
import { UserModel } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new BehaviorSubject<UserModel | null>(null);

  constructor(private httpClient : HttpClient) { }

  login(loginForm : LoginPayload){
    return this.httpClient.post<AuthResponse>(environment.apiURL + '/auth/login/', loginForm).pipe(
      map(data =>{
        localStorage.setItem('email', data.email)
      })
    );
  }

  register(registerForm : FormData){
    return this.httpClient.post<AuthResponse>(environment.apiURL + '/auth/register', registerForm).pipe(
      map(registerRes =>{
          localStorage.setItem('email', registerRes.email);
          this.retrieveCurrentUser();
        })
    )
  }

  logout(){
    return this.httpClient.get(`${environment.apiURL}/auth/logout/`).subscribe({
      next: (res)=>{
        localStorage.removeItem('email');
        window.location.reload();
      }
    })
  }

  retrieveCurrentUser() : void{
    if(localStorage.getItem('email') == null)return ;
    this.httpClient.get<UserModel>(environment.apiURL + '/auth/get_current_user/').subscribe((newUser)=>this.user.next(newUser));
  }

  getCurrentUser(){
    return this.user;
  }
}
