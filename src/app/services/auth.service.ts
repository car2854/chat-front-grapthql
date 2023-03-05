import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { catchError, map, of, tap } from 'rxjs';
import { LOGIN, REGISTER, RENEWTOKEN } from '../graphql/graphql.mutation';

import UserModel from './../models/user.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user!: UserModel;

  constructor(
    private apollo: Apollo
  ) { }

  private get token(){
    return localStorage.getItem('token') || '';
  }

  public login = (data:any) => {
    return this.apollo.mutate({
      mutation: LOGIN,
      variables: data
    }).pipe(
      tap((resp:any) => {
        this.user = resp.data.login;
        localStorage.setItem('token', resp.data.login.token);
      })
    )
  }

  public register = (data:any) => {
    return this.apollo.mutate({
      mutation: REGISTER,
      variables: data
    }).pipe(
      tap((resp:any) => {
        this.user = resp.data.register;
        localStorage.setItem('token', resp.data.register.token);
      })
    )
  }

  public validateToken = () => {

    return this.apollo.mutate({
      mutation: RENEWTOKEN,
      context: {
        headers: {
          // "Content-Type": "application/json",
          "token": this.token
        }
      }
    })
    .pipe(
      map((resp:any) => {
        this.user = resp.data.renewToken;
        localStorage.setItem('token', resp.data.renewToken.token);
        return true;
      }),
      catchError(err => of(false))
    )

  }

}
