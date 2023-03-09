import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalNewGroupComponent } from './modal-new-group/modal-new-group.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ModalNewGroupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalNewGroupComponent
  ]
})
export class ComponentsModule { }
