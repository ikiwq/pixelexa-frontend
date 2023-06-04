import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faExclamationCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';
import { LoginPayload } from 'src/models/auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  warning = faExclamationCircle
  eye = faEye;
  eyeSlash = faEyeSlash;

  constructor(private authService : AuthService, private router : Router) { }

  errorMessage : string | null = null;
  loading : Boolean = false;
  loginForm = new FormGroup({
    email : new FormControl(''),
    password : new FormControl('')
  })

  passwordShown : Boolean = false;

  ngOnInit(): void {
  }

  login() : void{    
    if (this.loading) return ;

    let email = this.loginForm?.get('email')!.value;
    let password = this.loginForm?.get('password')!.value;
    if(!email || !password) return ;

    let loginPayload = new LoginPayload();
    loginPayload.email = email;
    loginPayload.password = password;

    this.authService.login(loginPayload).subscribe({
      next: (data)=>{this.authService.retrieveCurrentUser(); this.router.navigate(['/']); this.loading = false},
      error: (err)=>{this.errorMessage = err.error.message; this.loading = false;}
    })
  }

  togglePassword(){
    this.passwordShown = !this.passwordShown;
  }
}
