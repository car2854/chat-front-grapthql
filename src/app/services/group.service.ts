import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ADD_NEW_USER_GROUP, CLEAR_ROLE, CREARTE_GROUP, NEW_MODETAROR, REMOVE_FROM_GROUP, UPDATE_GROUP } from '../graphql/graphql.mutation';
import { All_USER_WITHIN_GROUP, GET_GROUP_INTERACTIONS } from '../graphql/graphql.queries';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private apollo: Apollo
  ) { }

  private get token() {
    return localStorage.getItem('token') || ''
  };

  public createGroup = (data:{title: string, users: {id: number, name: string}[], description?: string}) => {
    
    return this.apollo.mutate({
      mutation: CREARTE_GROUP,
      variables: data,
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    });
  }

  public getAllUserWitinGroup = (id: string) => {
    return this.apollo.query({
      query: All_USER_WITHIN_GROUP,
      variables: {id},
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    });
  }

  public newModerator = (id:number) => {
    return this.apollo.mutate({
      mutation: NEW_MODETAROR,
      variables: {
        id
      },
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    });
  }

  public clearRole = (id:number) => {
    return this.apollo.mutate({
      mutation: CLEAR_ROLE,
      variables: {
        id
      },
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    });
  }

  public addNewUserGroup = (data:{ idGroup: string, uidUser: string }) => {
    return this.apollo.mutate({
      mutation: ADD_NEW_USER_GROUP,
      variables: data,
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    });
  }

  public removeFromGroup = (data:{ idGroup: string, idUser: number }) => {
    return this.apollo.mutate({
      mutation: REMOVE_FROM_GROUP,
      variables: data,
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    });
  }

  public updateGroup = (data:{ idGroup: string, title?: string, description?: string, allow_image?: boolean, only_mod_host?: boolean}) => {
    return this.apollo.mutate({
      mutation: UPDATE_GROUP,
      variables: data,
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    });
  }

  public getInteractionOnlyGroup = () => {
    return this.apollo.query({
      query: GET_GROUP_INTERACTIONS,
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    });
  }
}
