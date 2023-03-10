import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { MutationResult } from 'apollo-angular';
import { InteractionModule } from 'src/app/models/interaction.module';
import { ChatService } from 'src/app/services/chat.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {

  public chatForm = this.fb.group({
    message: [,[Validators.required]]
  })

  public interaction!: InteractionModule;
  
  constructor(
    private interactionService: InteractionService,
    private chatService: ChatService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ){

    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });

  }

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id') || '0';

    this.interactionService.getGroupInteracionByUidUser(id)
      .subscribe((resp: ApolloQueryResult<any>) => {
        this.interaction = resp.data.findGroupInteraction;
      });

  }

  public sendMessage = () => {

    if (this.chatForm.invalid) return;

    const id = this.route.snapshot.paramMap.get('id') || '0';
    
    return this.chatService.createChatGroup({
      groupTo: id,
      message: this.chatForm.get('message')?.value || ''
    })
      .subscribe((resp: MutationResult<any>) => {
        this.chatForm.reset();
        console.log(resp);
      });

  }

}
