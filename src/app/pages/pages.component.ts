import { Component } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import Swal from 'sweetalert2';
import { StatusInteractionEnum } from '../enum/status-interaction';
import { InteractionModule } from '../models/interaction.module';
import UserModule from '../models/user.module';
import { AuthService } from '../services/auth.service';
import { InteractionService } from '../services/interaction.service';

interface UserInteractions{
  id_interaction: number,
  user: UserModule,
  status: string
}

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  
  public user!: UserModule;
  public interactions: InteractionModule[] = [];

  constructor(
    private authService: AuthService,
    private interactionSerice: InteractionService
  ){}

  ngOnInit(): void {
    this.user = this.authService.user;

    this.interactionSerice.getUsersInteractions()
      .subscribe((result: ApolloQueryResult<any>) => {

        this.interactions = result.data.getUsersInteractions;
        
        console.log(result.data.loading);
        console.log(result.error);
        
      });

  }

  public convertInteractionToUserInteractions = (interactions: InteractionModule[]) : UserInteractions[] => {

    const newList: UserInteractions[] = [];

    interactions.forEach((interaction: InteractionModule) => {

      let data: UserInteractions = {
        id_interaction: interaction.id,
        status: '',
        user: interaction.user_from
      };

      if (interaction.user_from.id === this.user.id){
        data.user = interaction.user_to;

        if (interaction.status_from != StatusInteractionEnum.active){

          

        }

      }else{



      }

      newList.push(data);

    });

    return newList

  }


  public selectOptionsUser = (event:any) => {
    const refData = (event.srcElement.classList.contains('fa-bars')) ? event.target.parentElement.parentElement.children[1] : event.target.parentElement.children[1];

    if (refData.classList.contains('hidden')) refData.classList.remove('hidden')
    else refData.classList.add('hidden');
  }

  public changeInput = (event:any) => {
    const userName = event.srcElement.value || '';

    this.interactionSerice.getUsersInteractions(userName)
      .subscribe((result: ApolloQueryResult<any>) => {

        this.interactions = result.data.getUsersInteractions;
        console.log(result.data.loading);
        console.log(result.error);
        

      });

  }

  public newUser = (event:any) => {
    event.target.parentElement.classList.add('hidden');
    Swal.fire({
      title: 'Ingrese el id del usuario',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: (uid:string) => {
        return this.interactionSerice.getUserInteracionByUidUser(uid)
          .subscribe((result: ApolloQueryResult<any>) => {

            console.log(result.data?.rates);
            console.log(result.data.loading);
            console.log(result.error);
            

          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    })
  }
}
