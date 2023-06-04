import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { MessageModel } from 'src/models/message.model';
import { io } from 'socket.io-client'
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserModel } from 'src/models/user.model';
import { ChatModel } from 'src/models/chat.model';
import { ChatDictionary } from 'src/models/chat-dictionary.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: any;
  private chats = new BehaviorSubject<ChatDictionary>({});

  private currentUser: UserModel | null = null;

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  public init(): void {
    this.authService.getCurrentUser().subscribe((user) => this.currentUser = user);

    this.socket = io('http://localhost:5000', {
      withCredentials: true
    });

    this.socket.on('message', (message: MessageModel) => {
      let chat_tag = message.sender.id == this.currentUser?.id ? message.recipient.username : message.sender.username;
    })
  }

  public sendMessage(message: string, id: string): void {

    let data = {
      'message': message,
      'recipient': id
    }

    this.socket.emit('message', data);
  }

  public getChats() {
    return this.chats;
  }

  public retrieveChat(username: string) {
    return this.httpClient.get<ChatModel>(environment.apiURL + '/chat/' + username).pipe(map((chat: ChatModel) => {
      chat.users.forEach((partecipant) => {
        if (partecipant.id != this.currentUser?.id) {
          let new_chat_value = this.chats.value;
          chat.recipient = partecipant;
          new_chat_value[partecipant.username] = chat;
          this.chats.next(new_chat_value);
        }
      })
      return true;
    }))
  }

}
