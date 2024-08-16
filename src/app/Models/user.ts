export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public city:string,
    public country:string,
    public contact:string,
    public role:string,
    public createdAt: Date,
  ) {}
}
