import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { MutationResult } from 'apollo-angular';
import { ChatModule } from 'src/app/models/chat.module';
import { InteractionModule } from 'src/app/models/interaction.module';
import UserModule from 'src/app/models/user.module';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {

  public chatForm = this.fb.group({
    message: [,[Validators.required]]
  })

  public interaction!: InteractionModule;
  public chats: ChatModule[] = [];
  public user!: UserModule;
  
  constructor(
    private interactionService: InteractionService,
    private chatService: ChatService,
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ){

    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });

  }

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id') || '0';

    this.user = this.authService.user;

    this.interactionService.getGroupInteracionByUidUser(id)
      .subscribe((resp: ApolloQueryResult<any>) => {
        this.interaction = resp.data.findGroupInteraction;
      });

    this.chatService.getChatGroup(id)
      .subscribe((resp: ApolloQueryResult<any>) => {
        this.chats = resp.data.getChatsGroup;
      });
  }

  public sendMessage = () => {

    if (this.chatForm.invalid) return;

    const id = this.route.snapshot.paramMap.get('id') || '0';
    
    return this.chatService.createChatGroup({
      groupTo: id,
      message: this.chatForm.get('message')?.value || ''
    })
      .subscribe((resp: MutationResult<any>) => {
        this.chatForm.reset();
        const data = resp.data.createChatGroup;
        const newChat: ChatModule = new ChatModule(
          data.id,
          data.message,
          data.user_from,
          data.group_to,
          data.group_to
        );
        this.chats = [newChat, ...this.chats]
      });

  }

}
