import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ChatService } from '../../service/chat.service';
import { UserService } from 'src/app/user/services/user.service';
import { ChatDictionary } from 'src/models/chat-dictionary.interface';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-chats-list-view',
  templateUrl: './chats-list-view.component.html',
  styleUrls: ['./chats-list-view.component.scss']
})
export class ChatsListViewComponent {
  search = faSearch;

  constructor(private userService : UserService, private chatService: ChatService, private authService : AuthService) { }

  @Input() recipient : Observable<UserModel> | null = null;
  userSearchList : UserModel[] = [];
  chats : ChatDictionary = {};
  searchString : string = '';

  public inputGroup = new FormGroup({
    chatSearchInput: new FormControl('', [Validators.minLength(0), Validators.maxLength(32)])
  })

  ngOnInit(): void {
    this.chatService.getChats().subscribe((chats)=>this.chats = chats);
    //this.authService.getCurrentUser().subscribe((user)=>{if(user)this.currentUserId = user.id});
  }

  showList() : void {

  }

  searchUser(event : Event) : void{
    let newSearchString = this.inputGroup.get('chatSearchInput')?.value;
    if(newSearchString == null || newSearchString == '') return ;

    this.userService.getUsersByUsername(newSearchString).subscribe((users)=>{
      if(this.userSearchList.length == 0){
        this.userSearchList.push(...users);
        return ;
      }
      if(newSearchString != this.searchString){
        this.searchString = newSearchString!;
        this.userSearchList = [];
        this.userSearchList.push(...users);
        return ;
      }
    });
  }
}
