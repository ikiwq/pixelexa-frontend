import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faBars, faCommentAlt} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit
{

  chat = faCommentAlt;
  plus = faPlusSquare;
  bars = faBars;


  @ViewChild("menuDiv") private menuRef! : ElementRef<HTMLElement>;
  @ViewChild("profilePic") private pfpRef! : ElementRef<HTMLElement>;

  @HostListener('document:click', ['$event'])
  clickout(event : Event){
    const target = event.target as HTMLElement;
    if(this.pfpRef == undefined || this.pfpRef.nativeElement == undefined || this.menuRef.nativeElement == undefined) return ;
    if(this.pfpRef.nativeElement.contains(target)) return ;

    if(!this.menuRef?.nativeElement.contains(target) && this.menuShown){
      this.closeMenu();
    }
  }

  constructor(private authService: AuthService){}

  menuShown : BehaviorSubject<boolean> = new BehaviorSubject(false);

  currentUser : UserModel | null = null;

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user)=>this.currentUser = user);
  }

  closeMenu(){
    document.getElementById("menu")!.style.display = "none";
    this.menuShown.next(false);
  }

  toggleMenu(){
    if(this.menuShown.value == true){
      this.closeMenu();
      return ;
    }

    document.getElementById("menu")!.style.display = "flex";
    this.menuShown.next(true)
  }

}
