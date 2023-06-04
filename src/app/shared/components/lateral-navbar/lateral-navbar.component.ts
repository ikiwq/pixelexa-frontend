import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { faSearch, faStar} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CategoryService } from 'src/app/category/service/category.service';
import { CategoryModel } from 'src/models/category.model';
import { UserModel } from 'src/models/user.model';
@Component({
  selector: 'app-lateral-navbar',
  templateUrl: './lateral-navbar.component.html',
  styleUrls: ['./lateral-navbar.component.scss']
})
export class LateralNavbarComponent implements OnInit {
  
  star = faStar;
  search = faSearch;

  menu_open : Boolean = true;

  links = [
    {
      name : "Homepage",
      link : ''
    },
  ]

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const lateralMenu = document.getElementById('lateral-menu');
    const lateralMenuButton = document.getElementById('lateral-menu-button');
    
    if(lateralMenuButton && lateralMenuButton.contains(event.target as Node)){
      this.menu_open = !this.menu_open;
      return ;
    }

    if (lateralMenu && this.menu_open && !lateralMenu.contains(event.target as Node)) {
      this.menu_open = !this.menu_open;
      return ;
    }
  }

  searchFormGoup = new FormGroup({
    searchInput : new FormControl('', [Validators.minLength(0), Validators.maxLength(100)])
  })

  constructor(private authService : AuthService, private categoryService : CategoryService, private router : Router) { }

  logged : Boolean = false;
  userModel : UserModel | null = null;

  categories : CategoryModel[] = [];

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user)=>{this.logged = user == null ? false : true; this.userModel = user});
    this.categoryService.getCategoryStorage().subscribe((categories)=>{
      if(categories["POPULAR"]){
        this.categories = categories["POPULAR"];
      }
    })
    this.router.events.subscribe((event)=>{
      if (event instanceof NavigationEnd){
        this.menu_open = false;
      }
    })
  }

  go_to_search() : void{
    if(!this.searchFormGoup.valid) return ;
    this.router.navigate(['', 'search', this.searchFormGoup.controls.searchInput.value]);
  }

  logout(){
    this.authService.logout();
  }
}
