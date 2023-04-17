import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { MutationResult } from 'apollo-angular';
import { Subscribable, Subscriber, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { StatusInteractionEnum } from '../enum/status-interaction';
import UserInteractions from '../interfaces/user-interactions';
import { GroupModule } from '../models/group.module';
import { InteractionModule } from '../models/interaction.module';
import UserModule from '../models/user.module';
import { AuthService } from '../services/auth.service';
import { InteractionService } from '../services/interaction.service';
import { MessageSocketService } from '../services/socket/message-socket.service';
import { UserSocketService } from '../services/socket/user-socket.service';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data/data.service';

// import sound from '../../assets/audio/notification.mp3';

export let browserRefresh = false;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  
  @ViewChild('refModalCreateGroup') refModalCreateGroup!: ElementRef<HTMLDivElement>;

  public user!: UserModule;

  public idSelected = 0;
  public groupSelected = '';

  private socketSubscription: Subscription[] = [];

  constructor(
    public authService: AuthService,
    private interactionSerice: InteractionService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private userSocketService: UserSocketService,
    private messageSocketService: MessageSocketService,
    public dataService: DataService
  ){

  }
  

  ngOnInit(): void {
    
    this.user = this.authService.user;

    this.interactionSerice.getUsersInteractions()
      .subscribe((result: ApolloQueryResult<any>) => {
        
        
        this.dataService.interactions = result.data.getUsersInteractions;
        // console.log(this.interactions);
        
        // console.log(result.data.loading);
        // console.log(result.error);
        
        const groupData: GroupModule[] = [];

        this.dataService.interactions.forEach((interaction: InteractionModule) => {
          if (interaction.group_from != null) groupData.push(interaction.group_from);
        });

        this.userSocketService.emitJoinUser({user_id: this.user.id, group: groupData});


      });
    
    this.verifyRouter();

    
    this.socketSubscription.push(
      
      this.userSocketService.handleIdSection().subscribe({
        error : (err) => {
          console.log(err);
        },
        next : (value:any) => {
          this.userService.updateIdSection({idSection: value}).subscribe(
            (result:MutationResult<any>) => {
              if (result.errors) console.log(result.errors);
              else console.log(result.data);
            }
          )
        },
      })

    ),

    this.socketSubscription.push(

      this.messageSocketService.handleNotification().subscribe({
        error(err) {
          console.log(err);
        },
        next:(value:any) => {
          const {message, message_id, user_from, user_to, group_to } = value[0];
          console.log(user_from);
          if (user_from.id != this.user.id){
            const audio = new Audio('../../assets/audio/notification.mp3');
            audio.play();
          }
        },
      })

    ),

    this.socketSubscription.push(
      this.userSocketService.handleNewGroup().subscribe({
        error(err) {
          console.log(err);
        },
        next(value:any) {
          console.log('hola como estas');
          console.log(value);
          
        },
      })
    )



  }

  ngOnDestroy(): void {
    this.socketSubscription.forEach((subscription: Subscription) => subscription.unsubscribe());
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

  public closeOptions = (event:any) => {
    event.target.parentElement.classList.add('hidden');
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

        this.dataService.interactions = result.data.getUsersInteractions;
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
              this.dataService.interactions = [result.data.findUserInteractionByUidUser, ...this.dataService.interactions];
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

  public noImage = (name:string) => {

    if (name.includes(' ')){
      return name.charAt(0).toUpperCase() + name.charAt(name.indexOf(' ') + 1).toUpperCase()
    }else{
      return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
    }
    
  }

}
