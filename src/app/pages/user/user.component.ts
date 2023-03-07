import { Component, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApolloError } from '@apollo/client/core';
import { ApolloQueryResult } from '@apollo/client/core/types';
import { MutationResult } from 'apollo-angular';
import { StatusInteractionEnum } from 'src/app/enum/status-interaction';
import { ChatModule } from 'src/app/models/chat.module';
import { InteractionModule } from 'src/app/models/interaction.module';
import UserModule from 'src/app/models/user.module';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  public chats: ChatModule[] = [];
  public user!: UserModule;
  public interaction!: InteractionModule;

  public chatForm = this.fb.group({
    message: [,[Validators.required]]
  });

  constructor(
    private interactionService: InteractionService,
    private chatService: ChatService,
    private authService: AuthService,
    private statusService: StatusService,
    private _activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ){
    // Cada vez que cambia de ruta, la pagina vuelve a recargar los datos, esto pasa ya que no estoy cambiando de ruta, solo un id, es decir, no cambio los componenetes
    // solo cambia su id.
    this._activatedRoute.paramMap.subscribe(params => {
      this.ngOnInit();
      this.chatForm.reset();
    });

  }

  ngOnInit(): void {
    
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0');

    this.user = this.authService.user;

    this.interactionService.getUserInteracion(id)
      .subscribe((result: ApolloQueryResult<any>) => {
        
        console.log(result.loading);
        if (result.error){
          const error = result.error;
          console.log(error);
        }

        if (result.data){
          this.interaction = result.data.findUserInteraction;
        }

        
      });
    
    this.chatService.getChat(id)
      .subscribe({
        next: (value:any) => {
          this.chats = value.data.getChats;
        },
        error(err:ApolloError) {
          console.log(err);
        },
      })
  }

  public isBlocked = () : boolean => {
    if (
      (this.interaction.user_from.id === this.user.id && this.interaction.status_to === StatusInteractionEnum.locked) || 
      (this.interaction.user_to.id === this.user.id && this.interaction.status_from === StatusInteractionEnum.locked)) return true;
    return false;
  }
  
  public youWereBlocked = () => {
    if (
      (this.interaction.user_from.id === this.user.id && this.interaction.status_from === StatusInteractionEnum.locked) || 
      (this.interaction.user_to.id === this.user.id && this.interaction.status_to === StatusInteractionEnum.locked)) return true;
    return false;
  }

  public isActive = (): boolean => {
    if (this.interaction.status_from === StatusInteractionEnum.active && this.interaction.status_to === StatusInteractionEnum.active) return true;
    return false;
  }

  public buttonOptionsInteractionUser = (event:any) => {
    const refData = (event.srcElement.classList.contains('fa-bars')) ? event.target.parentElement.parentElement.children[1] : event.target.parentElement.children[1];
    if (refData.classList.contains('hidden')) refData.classList.remove('hidden');
    else refData.classList.add('hidden');
  }

  public blockUser = (event:any) => {

    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    
    this.statusService.blockUser(id)
    .subscribe(
      (resp: MutationResult) => {
        event.target.parentElement.classList.add('hidden');
      }
    );
    
    // .subscribe({
    //   complete() {
    //     event.target.parentElement.classList.add('hidden');
    //   },
    //   error: (err:ApolloError) => {
    //     console.log(err);
    //   },
    // })
    
  }
  
  public unBlockUser = (event:any) => {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0');

    this.statusService.clearStatusUser(id)
    .subscribe(
      (resp:MutationResult) => {
        event.target.parentElement.classList.add('hidden');
      }
    )
      // .subscribe({
      //   complete() {
      //     event.target.parentElement.classList.add('hidden');
      //   },
      // });
  }

  public isBloqued = ():boolean => {

    if (this.interaction.user_from.id === this.user.id){
      return this.interaction.status_to === StatusInteractionEnum.locked;
    }else{
      return this.interaction.status_from === StatusInteractionEnum.locked;
    }

  }

  
  public sendMessage = () => {
    if (this.chatForm.invalid) return;
    
    const data = {
      ...this.chatForm.value,
      userTo: (this.interaction.user_from.id === this.user.id)? this.interaction.user_to.id : this.interaction.user_from.id
    }
    this.chatService.createChat(data)
      .subscribe({
        next : (value:any) => {
          const data = value.data.createChat;
          const newChat: ChatModule = new ChatModule(
            data.id,
            data.message,
            data.user_from,
            data.user_to
          );
          this.chats = [...this.chats, newChat]
        },
        error(err) {
          console.log(err);
        },
      })
    this.chatForm.reset(); 
  }

}
