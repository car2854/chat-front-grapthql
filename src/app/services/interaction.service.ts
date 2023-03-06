import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { USERS_INTERACTION, USER_INTERACTION } from '../graphql/graphql.queries';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(
    private apollo: Apollo
  ) { }

  private get token(){
    return localStorage.getItem('token') || '';
  }

  public getUsersInteractions = (userName: string = '') => {
    return this.apollo.watchQuery<any>({
      query: USERS_INTERACTION,
      variables: {userName},
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    }).valueChanges;
  }

  public getUserInteracion = (id:number) => {
    return this.apollo.watchQuery<any>({
      query: USER_INTERACTION,
      variables: {id},
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    }).valueChanges
  }
}
