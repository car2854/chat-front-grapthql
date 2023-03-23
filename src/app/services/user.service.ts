import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { UPDATE_UID_PROFILE } from '../graphql/graphql.mutation';

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

}
