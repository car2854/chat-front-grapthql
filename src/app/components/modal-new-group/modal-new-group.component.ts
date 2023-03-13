import { Component, ElementRef, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MutationResult } from 'apollo-angular';
import UserInteractions from 'src/app/interfaces/user-interactions';
import { GroupModule } from 'src/app/models/group.module';
import UserModule from 'src/app/models/user.module';
import { GroupService } from 'src/app/services/group.service';

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
    private groupService: GroupService
  ){}

  public cancel = () => {
    
    if(!this.refModal.classList.contains('hidden')){
      this.refModal.classList.add('hidden');
      this.groupForm.reset();
      this.userList = [];
    }
    
  }

  public existUser = (user:UserModule) => {
    const {create_at, email, uid_profile, ...data} = user;
    return this.userList.some((user:any) => user.id === data.id);
  }

  public clickUser = (user:UserModule) => {

    const {create_at, email, uid_profile, ...data} = user;
    if (this.userList.some((user:any) => user.id === data.id)) this.userList = this.userList.filter((user:any) => {
      if (user.id === data.id) return false;
      return true;
    }).map((_) => _);
    else this.userList.push({id: data.id, name: data.name});

  }

  public createGroup = () => {

    if (this.groupForm.invalid || this.userList.length < 2) return;

    const {title, description} = this.groupForm.value;

    this.groupService.createGroup({
      title: title || '',
      description: description || '',
      users: this.userList
    }).subscribe((resp: MutationResult<any>) => {
      //console.log(resp.data);
      //console.log(resp.errors);
      // console.log(resp);
    });
    

  }

}
