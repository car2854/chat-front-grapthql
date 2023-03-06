import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CLEAR_STATUS_USER, LOQUED_USER } from '../graphql/graphql.mutation';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(
    private apollo: Apollo
  ) { }

  private get token(){
    return localStorage.getItem('token') || '';
  }

  public blockUser = (idUser:number) => {

    return this.apollo.mutate({
      mutation: LOQUED_USER,
      variables: {id: idUser},
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    });

  }

  public clearStatusUser = (idUser:number) => {

    return this.apollo.mutate({
      mutation: CLEAR_STATUS_USER,
      variables: {id: idUser},
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    });

  }



}
