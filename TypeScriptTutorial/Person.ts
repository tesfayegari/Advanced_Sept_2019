export class Person{
  constructor(name: string ,email: string, phone: string, dob: Date){
    this.Name = name;
    this.Email = email;
    this.Phone = phone;
    this.dob = dob;
  }
  public Name: string;
  protected Email: string;
  private Phone: string;
  public dob: Date;

  toSTring(): void {

  }
}