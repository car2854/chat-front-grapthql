import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Injectable({
  providedIn: 'root'
})
export class MessageSocketService {

  constructor(
    private webSocket: WebsocketService
  ) { }

  public emitMessage = (payload:{message:string ,user_from: number, user_to:number}) => {
    this.webSocket.emit('message', payload);
  }

  public handleMessage = () => {
    return this.webSocket.listen('message');
  }
}
