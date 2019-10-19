import * as React from 'react';
import { IEmployeeCardProps } from './IEmployeeProps';


export default class EmployeeCard extends React.Component<IEmployeeCardProps, {}> {
  public render(): React.ReactElement<IEmployeeCardProps> {
    return (
      <div className="col-md-4 col-sm-12">
        <div className="card-container">
          <div className="card">
            <img className="card-img-top" src={this.props.employee.image} alt="Card image" />
            <div className="card-body">
              <h4 className="card-title">{this.props.employee.fullName}</h4>
              <p className="card-text">{this.props.employee.detail}</p>
              <a href={this.props.employee.url} className="btn btn-primary">See Profile</a>
            </div>
          </div>
        </div>
      </d
    );
  }
}
