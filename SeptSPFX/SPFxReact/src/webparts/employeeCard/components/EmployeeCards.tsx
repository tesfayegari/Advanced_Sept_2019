import * as React from 'react';
import { IEmployeeCardsProps, IEmployee } from './IEmployeeProps';
import EmployeeCard from "./EmployeeCard";


export default class EmployeeCards extends React.Component<IEmployeeCardsProps, {}> {
  public render(): React.ReactElement<IEmployeeCardsProps> {
    const emp: IEmployee[] = [
      {
        fullName: 'Tesfaye Gari',
        detail: 'Detail of Tesfaye Gari',
        image: 'https://media.gettyimages.com/photos/lion-picture-id182404172?k=6&m=182404172&s=612x612&w=0&h=6dRpSB6t0VrFo08r3dTZLSoWaGy0A7PFG88wmk0nl8Q=',
        url: '#'
      },
      {
        fullName: 'Abdi Nur',
        detail: 'Detail of Abdi Gari',
        image: 'https://media.gettyimages.com/photos/lion-picture-id182404172?k=6&m=182404172&s=612x612&w=0&h=6dRpSB6t0VrFo08r3dTZLSoWaGy0A7PFG88wmk0nl8Q=',
        url: '#'
      },
      {
        fullName: 'Yetim Adnew',
        detail: 'Detail of Yetim Gari',
        image: 'https://media.gettyimages.com/photos/lion-picture-id182404172?k=6&m=182404172&s=612x612&w=0&h=6dRpSB6t0VrFo08r3dTZLSoWaGy0A7PFG88wmk0nl8Q=',
        url: '#'
      }
    ];
    return (
      <div className="container">
        <h1> This is Employee Cards</h1>
        <div className="row">

          <EmployeeCard employee={emp[0]} />
          <EmployeeCard employee={emp[1]} />
          <EmployeeCard employee={emp[2]} />

        </div>
      </div>
    );
  }
}
