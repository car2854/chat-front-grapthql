export class GroupModule{
  constructor(
    public id: string,
    public create_at: Date,
    public description: string,
    public title: string
  ){}
}