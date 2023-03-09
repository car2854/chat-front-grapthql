import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalNewGroupComponent } from './modal-new-group/modal-new-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
  declarations: [
    ModalNewGroupComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalNewGroupComponent,
    UserProfileComponent
  ]
})
export class ComponentsModule { }
