import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatService } from '../../service/chat.service';
import { ChatDictionary } from 'src/models/chat-dictionary.interface';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{

  dots = faCommentDots;

  constructor(private activatedRoute : ActivatedRoute, private chatService : ChatService) { }

  public recipient : BehaviorSubject<UserModel> | null = null;
  public chats : ChatDictionary = {};

  ngOnInit(): void {
    this.chatService.getChats().subscribe((chats)=>this.chats = chats);

    this.activatedRoute.firstChild?.params.subscribe((params)=>{
      let user_tag : string = params["user_tag"];
      if(!user_tag) return ;

      user_tag = user_tag.slice(1);

      if(!this.chats[user_tag]){
        this.chatService.retrieveChat(user_tag).subscribe({
          next: (value) => {
            if(!this.recipient){
              this.recipient = new BehaviorSubject<UserModel>(this.chats[user_tag].recipient!);
              return ;
            }      
            this.recipient.next(this.chats[user_tag].recipient!)
          }
        });
      }else{
        if(!this.recipient){
          this.recipient = new BehaviorSubject<UserModel>(this.chats[user_tag].recipient!);
          return ;
        }
        this.recipient.next(this.chats[user_tag].recipient!)
      }
    })
  }
}
