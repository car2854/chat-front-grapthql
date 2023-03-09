import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FIND_GROUP, USERS_INTERACTION, USER_INTERACTION, USER_INTERACTION_BY_UID_PROFILE } from '../graphql/graphql.queries';

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
    }).valueChanges
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

  public getUserInteracionByUidUser = (uid:string) => {

    return this.apollo.watchQuery<any>({
      query: USER_INTERACTION_BY_UID_PROFILE,
      variables: {uid_profile: uid},
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    }).valueChanges
  }

  public getGroupInteracionByUidUser = (id:string) => {

    return this.apollo.watchQuery<any>({
      query: FIND_GROUP,
      variables: {id: id},
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    }).valueChanges
  }

}
