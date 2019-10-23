import * as React from 'react';
import { IEmployeeCardsProps } from './IEmployeeProps';
import EmployeeCard from "./EmployeeCard";


export default class EmployeeCards extends React.Component<IEmployeeCardsProps, {}> {
  public render(): React.ReactElement<IEmployeeCardsProps> {
    var emps =  this.props.employees;
    return (
      <div className="container">
        <h1>{this.props.description}</h1>
        <div className="row">
          {emps.map(emp => <EmployeeCard employee={emp} />)}
        </div>
      </div>
    );
  }
}
