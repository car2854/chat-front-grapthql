export default class UserModule{
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public create_at: Date
  ){}
}