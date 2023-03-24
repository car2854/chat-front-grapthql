import { RoleUserInteraction } from "../enum/role-user-interaction";
import { ImageModule } from "./image.module";

export default class UserModule{
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public status: string,
    public created_at: Date,
    public uid_profile: string,
    public image: ImageModule
  ){}
}