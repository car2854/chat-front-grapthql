import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { InteractionModule } from 'src/app/models/interaction.module';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-detail-group',
  templateUrl: './detail-group.component.html',
  styleUrls: ['./detail-group.component.scss']
})
export class DetailGroupComponent {

  public interaction!: InteractionModule;

  constructor(
    private fb: FormBuilder,
    private interactionService: InteractionService,
    private route: ActivatedRoute
  ){}
    
  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id') || '0';

    this.interactionService.getGroupInteracionByUidUser(id)
      .subscribe((result: ApolloQueryResult<any>) => {
        if (result.error){

        }else{
          this.interaction = result.data.findGroupInteraction;
        }
        
      })

  }

}
