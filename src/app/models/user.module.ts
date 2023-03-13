import { RoleUserInteraction } from "../enum/role-user-interaction";

export default class UserModule{
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public create_at: Date,
    public uid_profile: string,
  ){}
}