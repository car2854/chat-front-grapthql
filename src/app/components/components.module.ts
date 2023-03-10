import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalNewGroupComponent } from './modal-new-group/modal-new-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    ModalNewGroupComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  exports: [
    ModalNewGroupComponent,
    UserProfileComponent
  ]
})
export class ComponentsModule { }
