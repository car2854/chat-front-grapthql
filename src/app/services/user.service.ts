import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { UPDATE_ID_SECTION, UPDATE_STATUS_PROFILE, UPDATE_UID_PROFILE } from '../graphql/graphql.mutation';
import { FIND_USER_LIST } from '../graphql/graphql.queries';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apollo: Apollo
  ) { }

  private get token(){
    return localStorage.getItem('token') || '';
  }

  public updateUserUid = () => {

    return this.apollo.mutate({
      mutation: UPDATE_UID_PROFILE,
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    });

  }

  public updateStatusUser = (data: {status:string}) => {

    return this.apollo.mutate({
      mutation: UPDATE_STATUS_PROFILE,
      variables: data,
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    });

  }

  public updateIdSection = (data: {idSection:string}) => {

    return this.apollo.mutate({
      mutation: UPDATE_ID_SECTION,
      variables: data,
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    });

  }

  public findUsersList = (data: {users: {id:number}[]}) => {

    return this.apollo.query({
      query: FIND_USER_LIST,
      variables: data,
    })
  }

}
