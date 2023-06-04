import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { ChatService } from '../../service/chat.service';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {
  send = faPaperPlane;

  constructor(private chatService : ChatService) { }

  public chatForm = new FormGroup({
    chatTextController : new FormControl('', [Validators.required, Validators.minLength(1)])
  })
  
  @Input() recipientObservable : Observable<UserModel> = new Observable<UserModel>();
  recipient : UserModel | null = null;

  ngOnInit(): void {
    if(this.recipientObservable){
      this.recipientObservable.subscribe((user)=>this.recipient = user);
    }
  }

  sendMessage(event : Event){
    if(!this.recipient || !this.chatForm.valid) return ;
    this.chatService.sendMessage(this.chatForm.controls.chatTextController.value!, this.recipient.id);
    this.chatForm.controls.chatTextController.reset();
  }

}
