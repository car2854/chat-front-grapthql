import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UserSocketService {

  constructor(
    private webSocket: WebsocketService
  ) { }
  
  emitJoinUser = (payload: {user_id: number}) => {
    this.webSocket.emit('join-user', payload)
  }
  

}
