import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { InteractionModule } from 'src/app/models/interaction.module';
import UserModule from 'src/app/models/user.module';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { GroupService } from 'src/app/services/group.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent {

  public interaction!: InteractionModule;
  public user!: UserModule;

  public users: UserModule[] = [] ;

  constructor(
    private interactionService: InteractionService,
    private chatService: ChatService,
    private authService: AuthService,
    private groupService: GroupService,
    private route: ActivatedRoute
  ){

    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });

  }

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id') || '0';

    this.user = this.authService.user;

    this.interactionService.getGroupInteracionByUidUser(id)
      .subscribe((resp: ApolloQueryResult<any>) => {
        this.interaction = resp.data.findGroupInteraction;
      });
    
    this.groupService.getAllUserWitinGroup(id)
      .subscribe((resp: ApolloQueryResult<any>) => {
        this.users = [];
        resp.data.getAllUsersWithinGroup.forEach((element:any) => {
          this.users.push(element.user_to);
        });
      });

      
  }

}
