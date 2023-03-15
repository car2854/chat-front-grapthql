import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { Mutation, MutationResult } from 'apollo-angular';
import { RoleUserInteraction } from 'src/app/enum/role-user-interaction';
import { InteractionModule } from 'src/app/models/interaction.module';
import UserModule from 'src/app/models/user.module';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { GroupService } from 'src/app/services/group.service';
import { InteractionService } from 'src/app/services/interaction.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent {

  public interaction!: InteractionModule;
  public user!: UserModule;
  public userInteraction?: InteractionModule;
  public interactions: InteractionModule[] = [];

  constructor(
    private interactionService: InteractionService,
    private chatService: ChatService,
    private authService: AuthService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private interactionSerice: InteractionService
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
    
    this.groupService.getAllUserWitinGroup(id)
      .subscribe((resp: ApolloQueryResult<any>) => {
        this.interactions = resp.data.getAllUsersWithinGroup;

        this.userInteraction = this.interactions.find((interaction: InteractionModule) => interaction.user_to.id === this.user.id);
      });
      
  }

  public isNone = () => {
    if (this.userInteraction){
      return this.userInteraction.role === RoleUserInteraction.none;
    }
    return false;
  }

  public isHost = ():boolean => {
    if (this.userInteraction){
      return this.userInteraction.role === RoleUserInteraction.host;
    }
    return false;
  }

  public isYourself = (interaction: InteractionModule) => {
    return interaction.user_to.id === this.user.id;
  }

  public isHostOrModeratorInteraction = (interaction: InteractionModule) => {
    return interaction.role === RoleUserInteraction.host || interaction.role === RoleUserInteraction.moderator
  }

  public moderatorAndModerator = (interaction: InteractionModule) => {
    if (interaction.role === RoleUserInteraction.host) return false;
    if (this.userInteraction?.role === RoleUserInteraction.host) return false;
    return (interaction.role === RoleUserInteraction.moderator && this.userInteraction?.role === RoleUserInteraction.moderator)
  }

  public isHostInteraction = (interaction: InteractionModule) => {
    return interaction.role === RoleUserInteraction.host;
  }

  public isModeratorInteraction = (interaction: InteractionModule) => {
    return interaction.role === RoleUserInteraction.moderator;
  }

  public newModerator = (interaction: InteractionModule) => {

    return this.groupService.newModerator(interaction.id)
      .subscribe((resp:MutationResult<any>) => {
        if (resp.data) {
          this.interactions = this.interactions.map((interactionData: InteractionModule) => {
            if (interactionData.id != interaction.id) return interactionData;
            return new InteractionModule(
              interactionData.id, 
              interactionData.status_from, 
              interactionData.status_to, 
              interactionData.user_from, 
              interactionData.user_to,
              interactionData.group_from, 
              RoleUserInteraction.moderator
            )
          });
        }
      });

  }

  public clearRole = (interaction: InteractionModule) => {
    return this.groupService.clearRole(interaction.id)
      .subscribe((resp:MutationResult<any>) => {
        if (resp.data) {
          this.interactions = this.interactions.map((interactionData: InteractionModule) => {
            if (interactionData.id != interaction.id) return interactionData;
            return new InteractionModule(
              interactionData.id, 
              interactionData.status_from, 
              interactionData.status_to, 
              interactionData.user_from, 
              interactionData.user_to,
              interactionData.group_from, 
              RoleUserInteraction.none
            )
          });
        }
      });
  }

  public addNewUser = () => {

    

    Swal.fire({
      title: 'Ingrese el id del usuario',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonAriaLabel: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (uid:string) => {

        return this.groupService.addNewUserGroup({idGroup: this.interaction.group_from.id, uidUser: uid})
          .subscribe((result:MutationResult<any>) => {
            if (result.errors){
              console.log(result.errors);
            }else{
              this.interactions = [...this.interactions, result.data.addNewUserGroup];
            }
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    });
  }

  public removeFromGroup = (interactionData: InteractionModule) => {
    console.log(interactionData.user_to.id);
    console.log(this.interaction.group_from.id);
    this.groupService.removeFromGroup({
      idGroup: this.interaction.group_from.id,
      idUser: interactionData.user_to.id
    }).subscribe((result: MutationResult<any>) => {
      if(result.errors){
        console.log(result.errors);
      }else{
        console.log(result.data.removeFromGroup);
        this.interactions = this.interactions.filter((interaction: InteractionModule) => {
          if (interaction.id === interactionData.id) return false;
          return true;
        }).map((_) => _);
      }
    })
    
  }


}
