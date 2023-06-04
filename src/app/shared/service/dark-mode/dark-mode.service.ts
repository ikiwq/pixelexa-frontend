import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  darkMode = new BehaviorSubject<Boolean>(false);

  constructor() { }

  setDarkModeFromDefaultTheme() {
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
      this.darkMode.next(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("prefersDarkMode", "true");
      return ;
    }
    localStorage.setItem("prefersDarkMode", "false");
    document.documentElement.classList.add("light");
    this.darkMode.next(false);
  }

  checkForDarkModeInStorage(){
    if(localStorage.getItem("prefersDarkMode") != null){
      this.darkMode.next(Boolean("true" == localStorage.getItem("prefersDarkMode")));
      if(this.darkMode.value){
        document.documentElement.classList.add("dark");
      }
    }else{
      this.setDarkModeFromDefaultTheme();
    }
  }

  setDarkMode(bool : Boolean){
    this.darkMode.next(bool);
    localStorage.setItem("prefersDarkMode", String(bool));
  }

  toggleDarkMode(){
    this.darkMode.next(!this.darkMode.value);
    localStorage.setItem("prefersDarkMode", String(this.darkMode.value));
    if(!this.darkMode.value){
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }else{
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }

  getDarkMode(){
    return this.darkMode;
  }
}
