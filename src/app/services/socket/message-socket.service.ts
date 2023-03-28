import { Injectable } from '@angular/core';
import UserModule from 'src/app/models/user.module';
import { WebsocketService } from '../websocket.service';

@Injectable({
  providedIn: 'root'
})
export class MessageSocketService {

  constructor(
    private webSocket: WebsocketService
  ) { }

  public emitMessage = (payload:{message:string, message_id: number ,user_from: number, user_to:number}) => {
    this.webSocket.emit('message', payload);
  }

  public emitMessageGroup = (payload:{message:string, message_id: number ,user_from: UserModule, group_to:string}) => {
    this.webSocket.emit('message-group', payload);
  }

  public handleMessage = () => {
    return this.webSocket.listen('aswner-message');
  }

  public handleMessageGroup = () => {
    return this.webSocket.listen('aswner-message-group');
  }
}
