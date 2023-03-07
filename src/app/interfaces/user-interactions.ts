import UserModule from "../models/user.module";

export default interface UserInteractions{
  id_interaction: number,
  user: UserModule,
  status: string
}
