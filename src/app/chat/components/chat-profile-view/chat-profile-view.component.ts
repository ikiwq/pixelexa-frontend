import { Component, Input, OnInit } from '@angular/core';
import { MessageModel } from 'src/models/message.model';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-chat-profile-view',
  templateUrl: './chat-profile-view.component.html',
  styleUrls: ['./chat-profile-view.component.scss']
})
export class ChatProfileViewComponent implements OnInit{
  @Input() user : UserModel = new UserModel();
  @Input() lastMessage : MessageModel | null = null;
  
  constructor(){}

  ngOnInit(): void {
      
  }
}
