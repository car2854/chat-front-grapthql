import { Component, ElementRef, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApolloError, Observable } from '@apollo/client/core';
import { ApolloQueryResult } from '@apollo/client/core/types';
import { MutationResult } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { StatusInteractionEnum } from 'src/app/enum/status-interaction';
import { ChatModule } from 'src/app/models/chat.module';
import { InteractionModule } from 'src/app/models/interaction.module';
import UserModule from 'src/app/models/user.module';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { MessageSocketService } from 'src/app/services/socket/message-socket.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  @ViewChild('inputFile') inputFile!: ElementRef<HTMLInputElement>

  public imgTemp: any;
  public file!: File;

  public chats: ChatModule[] = [];
  public user!: UserModule;
  public interaction!: InteractionModule;

  private socketSubcription!: Subscription;

  public chatForm = this.fb.group({
    message: [,[Validators.required]]
  });

  constructor(
    private interactionService: InteractionService,
    private chatService: ChatService,
    private authService: AuthService,
    private statusService: StatusService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageSocket: MessageSocketService
  ){
    // Cada vez que cambia de ruta, la pagina vuelve a recargar los datos, esto pasa ya que no estoy cambiando de ruta, solo un id, es decir, no cambio los componenetes
    // solo cambia su id.
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
      this.chatForm.reset();
    });

  }

  
  ngOnInit(): void {
    
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0');

    this.user = this.authService.user;


    this.socketSubcription = this.messageSocket.handleMessage().subscribe({
      
      next : (value: any) => {

        const {message , message_id, user_from, user_to } = value[0];

        if (this.chats.some((chat: ChatModule) => chat.id === message_id )) return;

        const newChat: ChatModule = new ChatModule(
          message_id,
          message,
          user_from,
          user_to
        );
        this.chats = [newChat, ...this.chats];

      },
      error : (err) => {
        console.log(err);
      },
    });



    this.interactionService.getUserInteracion(id)
      .subscribe((result: ApolloQueryResult<any>) => {
        
        // console.log(result.loading);
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.socketSubcription.unsubscribe();
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
  
  public sendMessage = () => {

    if (this.chatForm.invalid) return;
    
      

    if (this.imgTemp){
      
      
      // TODO: Enviar mensaje con imagen

    }else{

      // Enviar mensaje sin imagen

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
            this.chats = [newChat, ...this.chats];
  
            this.messageSocket.emitMessage({message: data.message, message_id: data.id, user_from: this.user.id, user_to: (data.user_from.id === this.user.id)? data.user_to : data.user_from});
  
          },
          error(err) {
            console.log(err);
          },
        })
      this.chatForm.reset(); 

    }

    
  }


  public selectImage = () => {
    this.inputFile.nativeElement.click();
  }

  public changeImage = (event:any) => {

    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file){

      this.file = file;

      const reader = new FileReader();
      const url64 = reader.readAsDataURL(this.file);

      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }

    }

  }

  public clearImage = () => {
    this.imgTemp = null;
  }
}
