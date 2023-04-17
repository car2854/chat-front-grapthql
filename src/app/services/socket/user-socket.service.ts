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

  emitNewGroup = (payload: {users: {id: number, id_section: string, name: string}[], group: any}) => {
    this.webSocket.emit('join-user-group', payload);
  }
  
  public handleIdSection = () => {
    return this.webSocket.listen('id-section');
  }

  public handleNewGroup = () => {
    return this.webSocket.listen('aswner-add-group');
  }

}
