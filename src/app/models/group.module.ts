import { ImageModule } from "./image.module";

export class GroupModule{
  constructor(
    public id: string,
    public created_at: Date,
    public description: string,
    public title: string,
    public only_mod_host: boolean,
    public allow_image: boolean,
    public image: ImageModule
  ){}
}