import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { StatusInteractionEnum } from '../enum/status-interaction';
import UserInteractions from '../interfaces/user-interactions';
import { InteractionModule } from '../models/interaction.module';
import UserModule from '../models/user.module';
import { AuthService } from '../services/auth.service';
import { InteractionService } from '../services/interaction.service';

export let browserRefresh = false;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  
  @ViewChild('refModalCreateGroup') refModalCreateGroup!: ElementRef<HTMLDivElement>;

  public user!: UserModule;
  public interactions: InteractionModule[] = [];

  public idSelected = 0;
  public groupSelected = '';

  constructor(
    private authService: AuthService,
    private interactionSerice: InteractionService,
    private route: ActivatedRoute,
    private router: Router,
  ){

  }
  

  ngOnInit(): void {
    
    this.user = this.authService.user;

    this.interactionSerice.getUsersInteractions()
      .subscribe((result: ApolloQueryResult<any>) => {
        
        
        this.interactions = result.data.getUsersInteractions;
        // console.log(this.interactions);
        
        // console.log(result.data.loading);
        // console.log(result.error);
        
      });
    
    this.verifyRouter();
  }

  private verifyRouter = () => {
    const id = this.router.url.split('/')[3]
    if (this.containsOnlyNumbers(id)) this.idSelected = parseInt(id);
    else this.groupSelected = id;
  }

  private containsOnlyNumbers(str:string) {
    return /^[0-9]+$/.test(str);
  }

  public convertInteractionToUserInteractions = (interactions: InteractionModule[]) : UserInteractions[] => {

    const newList: UserInteractions[] = [];

    interactions.forEach((interaction: InteractionModule) => {

      let data: UserInteractions = {
        id_interaction: interaction.id,
        status: '',
        user: interaction.user_to,
        group: interaction.group_from
      };

      if (interaction.user_to.id === this.user.id){

        if (interaction.user_from){
          
          data.user = interaction.user_from;

        }

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

  public logout = (event:any) => {
    event.target.parentElement.classList.add('hidden');
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

  public changeInput = (event:any) => {
    const userName = event.srcElement.value || '';

    this.interactionSerice.getUsersInteractions(userName)
      .subscribe((result: ApolloQueryResult<any>) => {

        this.interactions = result.data.getUsersInteractions;
        // console.log(result.data.loading);
        // console.log(result.error);
        

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
      confirmButtonText: 'Agregar',
      cancelButtonAriaLabel: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (uid:string) => {


        return this.interactionSerice.getUserInteracionByUidUser(uid)
          .subscribe((result: ApolloQueryResult<any>) => {

            if (result.error){
              console.log(result.error);
            }else{
              this.interactions = [result.data.findUserInteractionByUidUser, ...this.interactions];
              // console.log(result.data.loading);
            }

          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    })
  }

  public createGroup = (event:any) => {
    
    event.target.parentElement.classList.add('hidden');

    this.refModalCreateGroup.nativeElement.classList.remove('hidden');
    
  }

  public clickCloseModal = (event:any) => {
    
    if (event.srcElement.classList.contains('modal-component')){
      event.srcElement.classList.add('hidden');
    }

  }

}
