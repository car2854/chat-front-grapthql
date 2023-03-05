import { StatusInteractionEnum } from "../enum/status-interaction";
import UserModule from "./user.module";

export class InteractionModule{

  constructor(
    public id: number,
    public status_from : StatusInteractionEnum,
    public status_to: StatusInteractionEnum,
    public user_from: UserModule,
    public user_to: UserModule
  ){}

}