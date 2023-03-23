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

}
