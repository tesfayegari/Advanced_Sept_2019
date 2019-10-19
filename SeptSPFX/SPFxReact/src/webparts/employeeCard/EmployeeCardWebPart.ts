import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from "@microsoft/sp-loader";

import * as strings from 'EmployeeCardWebPartStrings';
import EmployeeCards from './components/EmployeeCards';
import { IEmployeeCardsProps } from './components/IEmployeeProps';

export interface IEmployeeCardWebPartProps {
  description: string;
}

export default class EmployeeCardWebPart extends BaseClientSideWebPart<IEmployeeCardWebPartProps> {

  public render(): void {
    SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');
    const element: React.ReactElement<IEmployeeCardsProps > = React.createElement(
      EmployeeCards,
      {
        description: this.properties.description
      }
    );


    //ReactDom.render(<EmployeeCard description="Test"/>,this.domElement);

    ReactDom.render(element, this.domElement);
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
