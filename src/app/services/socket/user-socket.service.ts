import { Injectable } from '@angular/core';
import { GroupModule } from 'src/app/models/group.module';
import { WebsocketService } from '../websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UserSocketService {

  constructor(
    private webSocket: WebsocketService
  ) { }
  
  emitJoinUser = (payload: {user_id: number, group?: GroupModule[]}) => {
    this.webSocket.emit('join-user', payload)
  }
  

}
