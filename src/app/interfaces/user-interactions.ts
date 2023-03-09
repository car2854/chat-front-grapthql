import { GroupModule } from "../models/group.module";
import UserModule from "../models/user.module";

export default interface UserInteractions{
  id_interaction: number,
  user?: UserModule,
  group?: GroupModule,
  status: string
}
