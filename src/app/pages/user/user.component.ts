import { Component, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StatusInteractionEnum } from 'src/app/enum/status-interaction';
import { ChatModule } from 'src/app/models/chat.module';
import { InteractionModule } from 'src/app/models/interaction.module';
import UserModule from 'src/app/models/user.module';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { InteractionService } from 'src/app/services/interaction.service';

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
    private _activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ){
    // Cada vez que cambia de ruta, la pagina vuelve a recargar los datos, esto pasa ya que no estoy cambiando de ruta, solo un id, es decir, no cambio los componenetes
    // solo cambia su id.
    this._activatedRoute.paramMap.subscribe(params => {
      this.ngOnInit();
    });

  }

  ngOnInit(): void {
    
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0');

    this.user = this.authService.user;

    this.interactionService.getUserInteracion(id)
      .subscribe({
        next: (resp:any) => {
          this.interaction = resp.data.findUserInteraction;
          console.log(this.interaction);
        },
        error(err) {
          console.log(err);
        },
      })
    
    this.chatService.getChat(id)
      .subscribe({
        next: (value:any) => {
          this.chats = value.data.getChats;
        },
        error(err) {
          console.log(err);
        },
      })
  }

  public isLocked = () : boolean => {
    if (this.interaction.user_from.id === this.user.id && this.interaction.status_to === StatusInteractionEnum.locked) return true;
    if (this.interaction.status_from === StatusInteractionEnum.locked) return true;
    return false;
  }
  
  public youWereBlocked = () => {
    if (this.interaction.user_from.id === this.user.id && this.interaction.status_from === StatusInteractionEnum.locked) return true;
    if (this.interaction.status_to === StatusInteractionEnum.locked) return true;
    return false;
  }

  public isActive = ():boolean => {
    if (this.interaction.status_from === StatusInteractionEnum.active && this.interaction.status_to === StatusInteractionEnum.active) return true;
    return false;
  }

  public sendMessage = () => {
    if (this.chatForm.invalid) return;
    console.log(this.chatForm.value);
    this.chatForm.reset(); 
  }
}
