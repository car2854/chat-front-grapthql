import UserModule from "./user.module";

export class ChatModule{
  constructor(
    public id: number,
    public message: string,
    public user_from: UserModule,
    public user_to: UserModule
  ){}
}