import { Component, Input, OnInit } from '@angular/core';
import { faBookmark, faComment, faMoon, faPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { DarkModeService } from 'src/app/shared/service/dark-mode/dark-mode.service';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit{

  saved = faBookmark;
  chat = faComment;
  new = faPlus;
  logoutIcon = faUserMinus;
  moon = faMoon;

  menuShown : Boolean = false;

  @Input() shownObservable : BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private authService : AuthService, private darkModeService : DarkModeService){}

  currentUser : UserModel | null = null;

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user)=>this.currentUser = user);
    this.shownObservable.subscribe((bool)=>this.menuShown = bool);
  }

  logout(event : Event) : void {
    this.authService.logout();
  }

  closeMenu(){
    document.getElementById("menu")!.style.display = "none";
    this.shownObservable.next(false);
  }

  toggleDarkMode(){
    this.darkModeService.toggleDarkMode();
  }

}
