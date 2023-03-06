import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { USER_CHAT } from '../graphql/graphql.queries';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private apollo: Apollo
  ) { }

  private get token(){
    return localStorage.getItem('token') || '';
  }

  public getChat = (id:number) => {

    return this.apollo.watchQuery({
      query: USER_CHAT,
      variables: {id},
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    }).valueChanges;

  }


}