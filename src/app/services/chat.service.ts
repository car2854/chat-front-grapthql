import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CREARTE_CHAT, CREARTE_CHAT_GROUP } from '../graphql/graphql.mutation';
import { USER_CHAT, USER_CHAT_GROUP } from '../graphql/graphql.queries';

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
 
  public getChatGroup = (id:string) => {

    return this.apollo.watchQuery({
      query: USER_CHAT_GROUP,
      variables: {id},
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    }).valueChanges;

  }


  public createChat = (data:any) => {

    return this.apollo.mutate({
      mutation: CREARTE_CHAT,
      variables: data,
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    });

  }

  public createChatGroup = (data:{message:string, groupTo: string}) => {

    return this.apollo.mutate({
      mutation: CREARTE_CHAT_GROUP,
      variables: data,
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    });

  }

}
