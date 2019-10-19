export interface IEmployeeCardProps { 
  employee: IEmployee;
}
export interface IEmployeeCardsProps {
  description: string;
}

export interface IEmployee{
  fullName: string;
  detail: string;
  image: string;
  url: string;
}
