import { Component, ElementRef, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApolloQueryResult } from '@apollo/client/core';
import { MutationResult } from 'apollo-angular';
import UserInteractions from 'src/app/interfaces/user-interactions';
import { GroupModule } from 'src/app/models/group.module';
import { InteractionModule } from 'src/app/models/interaction.module';
import UserModule from 'src/app/models/user.module';
import { DataService } from 'src/app/services/data/data.service';
import { GroupService } from 'src/app/services/group.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { UserSocketService } from 'src/app/services/socket/user-socket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-new-group',
  templateUrl: './modal-new-group.component.html',
  styleUrls: ['./modal-new-group.component.scss']
})
export class ModalNewGroupComponent {

  public groupForm = this.fb.group({
    'title': [, [Validators.required, Validators.min(8)]],
    'description': [, []]
  });

  private userList: {id: number, name: string}[] = [];

  @Input('refModal') refModal!: any;
  @Input('usersInteractions') usersInteracions: UserInteractions[] = [];

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private interactionSerice: InteractionService,
    private userService: UserService,
    private userSocketService: UserSocketService,
    public dataService: DataService
  ){}

  public cancel = () => {
    
    if(!this.refModal.classList.contains('hidden')){
      this.refModal.classList.add('hidden');
      this.groupForm.reset();
      this.userList = [];
    }
    
  }

  public existUser = (user:UserModule) => {
    const {created_at, email, uid_profile, ...data} = user;
    return this.userList.some((user:any) => user.id === data.id);
  }

  public clickUser = (user:UserModule) => {

    const {created_at, email, uid_profile, ...data} = user;
    if (this.userList.some((user:any) => user.id === data.id)) this.userList = this.userList.filter((user:any) => {
      if (user.id === data.id) return false;
      return true;
    }).map((_) => _);
    else this.userList.push({id: data.id, name: data.name});

  }

  public createGroup = () => {

    if (this.groupForm.invalid || this.userList.length < 2) return;

    const {title, description} = this.groupForm.value;

    const ids: {id:number}[] = [];

    this.userList.forEach((user:any) => {
      ids.push({id: user.id});
    })

    this.groupService.createGroup({
      title: title || '',
      description: description || '',
      users: this.userList
    }).subscribe((resp: MutationResult<any>) => {
      
      if (!resp.errors){

        // TODO: Aqui enviar un emit para meter a los usuarios al grupo
        this.userService.findUsersList({users: ids}).subscribe((value: ApolloQueryResult<any>) => {
          if (!value.errors){
            
            this.userSocketService.emitNewGroup({users: value.data.findUserList, group: resp.data.createGroup});
            
          }
        });
        
        if(!this.refModal.classList.contains('hidden')){
          this.refModal.classList.add('hidden');
          this.groupForm.reset();
          this.userList = [];
        }
        

      }
    });
    

  }

}
