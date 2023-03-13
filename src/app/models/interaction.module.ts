import { RoleUserInteraction } from "../enum/role-user-interaction";
import { StatusInteractionEnum } from "../enum/status-interaction";
import { GroupModule } from "./group.module";
import UserModule from "./user.module";

export class InteractionModule{

  constructor(
    public id: number,
    public status_from : StatusInteractionEnum,
    public status_to: StatusInteractionEnum,
    public user_from: UserModule,
    public user_to: UserModule,
    public group_from: GroupModule,
    public role: RoleUserInteraction
  ){}

}