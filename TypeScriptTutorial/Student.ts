import { Person } from "./Person";

export class Student extends Person {
  constructor(n: string, e: string, p: string, d: Date, dep: string) {
    super(n, e, p, d);
    this.Department = dep;
  }
  Department: string;



}