import { Component } from '@angular/core';
import { MutationResult } from 'apollo-angular';
import UserModule from 'src/app/models/user.module';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.scss']
})
export class UserProfileDetailsComponent {

  public user!: UserModule;

  constructor(
    private uploadService: UploadService,
    private authService: AuthService,
    private userService: UserService
  ){}

  ngOnInit(): void {
    this.user = this.authService.user;
    console.log(this.user);
    
  }

  public updateImage = (event:any) => {

    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file){

      this.uploadService.uploadImageUser(file)
        .then((resp:any) => {
          console.log(resp);
          this.authService.user.image = resp.image;
        }).catch((err:any) => {
          console.log(err);
        });

    }
    

  }

  public updateUid = () => {
    this.userService.updateUserUid()
      .subscribe((result: MutationResult<any>) => {
        if (result.errors){
          console.log(result.errors);
        }else{
          this.user = result.data.updateUidProfile;          ;
        }
        
      })
  }


  public updateStatus = (event:any) => {
    const value = event.srcElement.parentElement.children[0].value;
    this.userService.updateStatusUser({status: value.trim()})
      .subscribe((result: MutationResult<any>) => {
        if (result.errors){
          console.log(result.errors);
        }else{
          this.authService.user = result.data.updateStatusUser;
        }
      })
  }

  public editClick = (event:any) => {
    event.srcElement.parentElement.firstChild.disabled = false;
    event.srcElement.parentElement.firstChild.classList.add('select')
    event.srcElement.parentElement.children[1].hidden = true;
    event.srcElement.parentElement.children[2].hidden = false;
    event.srcElement.parentElement.children[3].hidden = false;
  }
  
  public saveClick = (event:any) => {
    event.srcElement.parentElement.firstChild.disabled = true;
    event.srcElement.parentElement.firstChild.classList.remove('select')
    event.srcElement.parentElement.children[1].hidden = false;
    event.srcElement.parentElement.children[2].hidden = true;
    event.srcElement.parentElement.children[3].hidden = true;

    const value = event.srcElement.parentElement.children[0].value;
    this.userService.updateStatusUser({status: value.trim()})
      .subscribe((result: MutationResult<any>) => {
        if (result.errors){
          console.log(result.errors);
        }else{
          this.authService.user = result.data.updateStatusUser;
          this.user = result.data.updateStatusUser;
        }
      })
    
  }

  public cancelClick = (event:any) => {
    event.srcElement.parentElement.firstChild.disabled = true;
    event.srcElement.parentElement.firstChild.classList.remove('select')
    event.srcElement.parentElement.children[1].hidden = false;
    event.srcElement.parentElement.children[2].hidden = true;
    event.srcElement.parentElement.children[3].hidden = true;

    event.srcElement.parentElement.children[0].value = this.user.status;
    
  }
}
