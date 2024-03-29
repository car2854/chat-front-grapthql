import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(
    private socket: Socket,
    private userService: UserService
  ) {
    this.checkStatus();
  }

  checkStatus(){
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }
  
  emit( event: string, payload?: any, callback?: Function ){
    this.socket.emit( event, payload, callback );
  }

  listen( event: string ){
    return this.socket.fromEvent( event );
  }
}
