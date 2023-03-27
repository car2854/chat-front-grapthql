import { Component } from '@angular/core';
import UserModule from './models/user.module';
import { AuthService } from './services/auth.service';
import { UserSocketService } from './services/socket/user-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat-frontend-grapthql';
}
