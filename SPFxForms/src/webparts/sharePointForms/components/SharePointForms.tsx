import * as React from 'react';
// import styles from './SharePointForms.module.scss';
import { ISharePointFormsProps } from './ISharePointFormsProps';
import { SPHttpClientResponse, SPHttpClient } from '@microsoft/sp-http';
// import { escape } from '@microsoft/sp-lodash-subset';

interface ISharePointFormState {
  Title: string;
  fullName: string;
  street: string;
  Appartment: string;
  city: string;
  state: number;
  isBillingSame: boolean;
  billing: string;
  zip: string;
  states: any[];
  currentUserID: number;
  item: any;
}

interface IListItem{
  Title: String;
  Id?: number;
  FullNameId: number;
  StreetAddress: string;
  Address2: string;
  City: string;
  isBillingSame: boolean;
  BillingAddress: string;
  ZipCode: string;
  StateId: number;
}

export default class SharePointForms extends React.Component<ISharePointFormsProps, ISharePointFormState> {
  private listItemEntityTypeName: string = undefined;
  private listName= 'PurchaseDetail';
  
  constructor(props: ISharePointFormsProps) {
    super(props);
    this.state = {
      Title: '',
      fullName: '',
      street: '',
      Appartment: '',
      city: '',
      state: 0,
      isBillingSame: true,
      billing: '',
      zip: '',
      states: [],
      currentUserID: null,
      item: null
    };

    this.readItems('State');
    this.currentUser();

    this.onChange = this.onChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  private onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value } as ISharePointFormState);
  }
  private handleSubmit(e) {
    e.preventDefault();
    this.createItem();
  }
  private handleCancel(e) {
    e.preventDefault();
    this.setState({
      Title: '',
      fullName: '',
      street: '',
      Appartment: '',
      city: '',
      state: 0,
      isBillingSame: true,
      billing: '',
      zip: ''
    });
  }


  // CRUD Operations
  private createItem(): void { 
    const newItem = this.state;
    this.getListItemEntityTypeName()
      .then((listItemEntityTypeName: string): Promise<SPHttpClientResponse> => {
        const body: string = JSON.stringify({
          '__metadata': {
            'type': listItemEntityTypeName
          },
          'Title': newItem.Title,
          "FullNameId": newItem.currentUserID,
          "StreetAddress": newItem.street,
          "Address2": newItem.Appartment,
          "City": newItem.city,
          "isBillingSame": newItem.isBillingSame,
          "BillingAddress": newItem.billing,
          "ZipCode": newItem.zip,
          "StateId": newItem.state == 0 ? null : newItem.state
        });
        return this.props.spHttpClient.post(`${this.props.siteUrl}/_api/web/lists/getbytitle('${this.listName}')/items`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              'Accept': 'application/json;odata=nometadata',
              'Content-type': 'application/json;odata=verbose',
              'odata-version': ''
            },
            body: body
          });
      })
      .then((response: SPHttpClientResponse): Promise<IListItem> => {
        return response.json();
      })
      .then((item: IListItem): void => {
        console.log(`Item '${item.Title}' (ID: ${item.Id}) successfully created`);
      }, (error: any): void => {
        console.error('Error while creating the item: ' + error);
      });
  }
  
  private getListItemEntityTypeName(): Promise<string> {
    return new Promise<string>((resolve: (listItemEntityTypeName: string) => void, reject: (error: any) => void): void => {
      if (this.listItemEntityTypeName) {
        resolve(this.listItemEntityTypeName);
        return;
      }

      this.props.spHttpClient.get(`${this.props.siteUrl}/_api/web/lists/getbytitle('${this.listName}')?$select=ListItemEntityTypeFullName`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        })
        .then((response: SPHttpClientResponse): Promise<{ ListItemEntityTypeFullName: string }> => {
          return response.json();
        }, (error: any): void => {
          reject(error);
        })
        .then((response: { ListItemEntityTypeFullName: string }): void => {
          this.listItemEntityTypeName = response.ListItemEntityTypeFullName;
          resolve(this.listItemEntityTypeName);
        });
    });
  }

  private readItems(list): void {    
    this.props.spHttpClient.get(`${this.props.siteUrl}/_api/web/lists/getbytitle('${list}')/items?$select=Title,Id`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
      .then((response: SPHttpClientResponse): Promise<{ value: any[] }> => {
        return response.json();
      })
      .then((response: { value: any[] }): void => {
        this.setState({states: response.value});// = response.value;
      }, (error: any): void => {
        console.error('Loading all items failed with error: ' , error);
          
      });
  }
  private readItem(itemId): void {    
    this.props.spHttpClient.get(`${this.props.siteUrl}/_api/web/lists/getbytitle('${this.listName}')/items(${itemId})`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
      .then((response: SPHttpClientResponse): Promise<any> => {
        return response.json();
      })
      .then((response: any): void => {
        this.setState({item: response});// = response.value;
      }, (error: any): void => {
        console.error('Loading all items failed with error: ' , error);
          
      });
  }

  private currentUser(): void {    
    this.props.spHttpClient.get(`${this.props.siteUrl}/_api/web/currentuser`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
      .then((response: SPHttpClientResponse): Promise<any> => {
        return response.json();
      })
      .then((response: any): void => {
        this.setState({currentUserID: response.Id, fullName: response.Title});// = response.value;
      }, (error: any): void => {
        console.error('Loading all items failed with error: ' , error);          
      });
  }

  // End f CRUD Operations

  private onChangeCheckbox = (e) => this.setState({ isBillingSame: e.target.checked });

  public render(): React.ReactElement<ISharePointFormsProps> {
    console.log('States are ', this.state.states);
    const stateItems = this.state.states.map(item => <option value= {item.Id}>{item.Title}</option>);
    return (
      <div className="container-fluid">
        <h2>{this.props.description}</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="Title">Title:</label>
              <input type="text" className="form-control" placeholder="Enter Title" name="Title" value={this.state.Title} onChange={this.onChange} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="fullName">Full Name:</label>
              <input type="text" className="form-control" placeholder="Enter Full Name" name="fullName" value={this.state.fullName} onChange={this.onChange} disabled/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <div className="form-group">
              <label >Street Address:</label>
              <input type="text" className="form-control" placeholder="123 Main Street" name="street" value={this.state.street} onChange={this.onChange} />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label >Appartment/Room #:</label>
              <input type="text" className="form-control" placeholder="Appartment #" name="Appartment" value={this.state.Appartment} onChange={this.onChange} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label >City:</label>
              <input type="text" className="form-control" placeholder="Enter City" name="city" value={this.state.city} onChange={this.onChange} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label >State:</label>
              <select className="form-control" name="state" value={this.state.state} onChange={this.onChange}>
                <option value="0">Select State --</option>
                {stateItems}
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Zip Code:</label>
              <input type="text" className="form-control" placeholder="Zip Code" name="zip" value={this.state.zip} onChange={this.onChange} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="checkbox">
              <label><input type="checkbox" name="isBillingSame" checked={this.state.isBillingSame} onChange={this.onChangeCheckbox} /> Is Billing Address Same</label>
            </div>
          </div>
          {!this.state.isBillingSame &&
            <div className="col-md-12">
              <div className="form-group">
                <label >Billing Address:</label>
                <textarea className="form-control" rows={3} name="billing" placeholder="Billing Address" value={this.state.billing} onChange={this.onChange}></textarea>
              </div>
            </div>
          }


          <div className="col-sm-12">
            <button type="submit" onClick={this.handleSubmit} className="btn btn-primary mx-2">Submit</button>
            <button type="submit" onClick={this.handleCancel} className="btn btn-secondary mx-2">Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}
