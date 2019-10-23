import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from "@microsoft/sp-loader";
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';

import * as strings from 'EmployeeCardWebPartStrings';
import EmployeeCards from './components/EmployeeCards';
import { IEmployeeCardsProps, IEmployee } from './components/IEmployeeProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IEmployeeCardWebPartProps {
  description: string;
  lists: string;// | string[]; // Stores the list ID(s)
}

export default class EmployeeCardWebPart extends BaseClientSideWebPart<IEmployeeCardWebPartProps> {
  private emps: IEmployee[] = [
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
  public render(): void {
    this.getAllItems()
      .then(data => {
        console.log('List Data', data.value);
        var employees: IEmployee[] = [];
        for (let employee of data.value) {
          employees.push({ fullName: employee.Title, detail: employee.Description, image: employee.Photo, url: '#' });
        }
        
        const element: React.ReactElement<IEmployeeCardsProps> = React.createElement(
          EmployeeCards,
          {
            description: this.properties.description,
            employees: employees
          }
        );
        ReactDom.render(element, this.domElement);
      }, error => {
        console.log('Oops Error', error);
        const elementError: React.ReactElement<IEmployeeCardsProps> = React.createElement(
          EmployeeCards,
          {
            description: this.properties.description,
            employees: this.emps
          }
        );
        ReactDom.render(elementError, this.domElement);
      });

    SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');
    
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  private getAllItems() {
    let url = this.context.pageContext.web.absoluteUrl + `/_api/web/Lists(guid'${this.properties.lists}')/items`;
    return this.context.spHttpClient.get(
      url,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
      .then((response: SPHttpClientResponse): Promise<{ value: any[] }> => {
        return response.json();
      });

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: 'Basci Info',
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Webpart Title'
                }),
                PropertyFieldListPicker('lists', {
                  label: 'Select a list',
                  selectedList: this.properties.lists,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
