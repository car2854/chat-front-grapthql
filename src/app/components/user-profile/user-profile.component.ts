import { Component, Input } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { MutationResult } from 'apollo-angular';
import { StatusInteractionEnum } from 'src/app/enum/status-interaction';
import { InteractionModule } from 'src/app/models/interaction.module';
import UserModule from 'src/app/models/user.module';
import { AuthService } from 'src/app/services/auth.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  @Input('id') idInput: number = 0;
  @Input('interactionInput') interaction!: InteractionModule;

  public user!: UserModule;

  constructor(
    private statusService: StatusService,
    private authService: AuthService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  public blockUser = (event:any) => {

    if (!this.interaction.group_from){
      
      const id = parseInt(this.route.snapshot.paramMap.get('id') || '0');
      
      this.statusService.blockUser(id)
      .subscribe(
        (resp: MutationResult) => {
          event.target.parentElement.classList.add('hidden');
        }
      );
    }
    
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

    if (!this.interaction.group_from){

      const id = parseInt(this.route.snapshot.paramMap.get('id') || '0');
      
      this.statusService.clearStatusUser(id)
      .subscribe(
        (resp:MutationResult) => {
          event.target.parentElement.classList.add('hidden');
        }
      )
    }
      // .subscribe({
      //   complete() {
      //     event.target.parentElement.classList.add('hidden');
      //   },
      // });
  }

  public buttonOptionsInteractionUser = (event:any) => {
    const refData = (event.srcElement.classList.contains('fa-bars')) ? event.target.parentElement.parentElement.children[1] : event.target.parentElement.children[1];
    if (refData.classList.contains('hidden')) refData.classList.remove('hidden');
    else refData.classList.add('hidden');
  }

  
  public isBloqued = ():boolean => {

    if (!this.interaction.group_from){
      if (this.interaction.user_from.id === this.user.id){
        return this.interaction.status_to === StatusInteractionEnum.locked;
      }else{
        return this.interaction.status_from === StatusInteractionEnum.locked;
      }
    }

    return false

  }

  public isGroup = () => {
    return (this.interaction.group_from);
  }

  public disguise = (event:any) => {
    event.target.parentElement.classList.add('hidden');
  }

  public noImage = (name:string) => {

    if (name.includes(' ')){
      return name.charAt(0).toUpperCase() + name.charAt(name.indexOf(' ') + 1).toUpperCase()
    }else{
      return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
    }
    
  }

  public existUserImage = () => {

    if (this.interaction.user_from.id === this.user.id) return (this.interaction.user_to.image != undefined)
    else return (this.interaction.user_from.image != undefined);

  }


  public noImageUser = () => {

    if (this.interaction.user_from.id === this.user.id) return this.noImage(this.interaction.user_to.name)
    else return this.noImage(this.interaction.user_from.name)
    
  }

  public getImageUser = () => {
    if (this.interaction.user_from.id === this.user.id) return this.interaction.user_to.image.dir
    else return this.interaction.user_from.image.dir
  }
}
