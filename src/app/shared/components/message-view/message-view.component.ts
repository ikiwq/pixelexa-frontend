import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ChatService } from 'src/app/chat/service/chat.service';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss']
})
export class MessageViewComponent implements OnInit {

  constructor(private chatService : ChatService, private authService: AuthService) { }

  @Input() userIdObservable : Observable<string> = new Observable();

  ngOnInit(): void {
  }

}
