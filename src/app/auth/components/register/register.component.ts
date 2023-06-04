import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faExclamationCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';
import { RegisterPayload } from 'src/models/auth.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  warning = faExclamationCircle;
  eye = faEye;
  eyeSlash = faEyeSlash;
  google = faGoogle;

  constructor(private authService : AuthService, private router : Router) { }

  defaultImage : string = "http://localhost:5000/image/default-user-image";

  errorMessage : string | null = null;
  loading : Boolean = false;
  passwordShown : Boolean = false;

  step : number = 0;

  public selectedImageFile : File | null = null;
  public selectedImage : any= null;

  registerForm1 = new FormGroup({
    name : new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
    email : new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  registerForm2 = new FormGroup({
    username : new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
  }

  public onFileChanged(event : any) : void {
    this.selectedImageFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.selectedImage = reader.result;
    }
  }

  togglePassword(){
    this.passwordShown = !this.passwordShown;
  }

  goBack(){
    this.step--;
  }

  nextForm(){  
    if(!this.registerForm1.valid){
      return ;
    }
    this.step++;
  }

  register(){
    if(!this.registerForm2.valid){
      return ;
    }

    let registerPayload = new RegisterPayload();
    registerPayload.email = this.registerForm1.controls.email.value!;
    registerPayload.name = this.registerForm1.controls.name.value!;
    registerPayload.password = this.registerForm1.controls.password.value!
    registerPayload.username = this.registerForm2.controls.username.value!

    let registerForm = new FormData();
    registerForm.append('data', JSON.stringify(registerPayload));
    if(this.selectedImageFile != null){
      registerForm.append('profile_image', this.selectedImageFile);
    }
  
    this.authService.register(registerForm).subscribe((res)=>{
      this.router.navigate(['/']);
    });
  }

}
