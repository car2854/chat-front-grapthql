import { Component, ElementRef, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import UserInteractions from 'src/app/interfaces/user-interactions';

@Component({
  selector: 'app-modal-new-group',
  templateUrl: './modal-new-group.component.html',
  styleUrls: ['./modal-new-group.component.scss']
})
export class ModalNewGroupComponent {

  @Input('refModal') refModal!: any;
  @Input('usersInteractions') usersInteracions: UserInteractions[] = [];

  constructor(
    private fb: FormBuilder
  ){}

  public cancel = () => {
    
    if(!this.refModal.classList.contains('hidden')){
      this.refModal.classList.add('hidden');
    }
    
  }
}
