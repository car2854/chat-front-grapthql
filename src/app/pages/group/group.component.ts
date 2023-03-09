import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { InteractionModule } from 'src/app/models/interaction.module';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {

  public interaction!: InteractionModule;

  constructor(
    private interactionService: InteractionService,
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

}
