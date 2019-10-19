import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

// import { escape } from '@microsoft/sp-lodash-subset';

// import styles from './HelloWorldWebPart.module.scss';

// import * as strings from 'HelloWorldWebPartStrings';

export interface IHelloWorldWebPartProps {
  description: string;
}



export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  public render(): void {    
    let myListsHtml = '';
    this.getAllLists().then(response => {
      //response.value.forEach(list => { console.log(`${list.Title} (${list.ItemCount})`); });
      for (let list of response.value) {
        myListsHtml += `<option value="${list.Title}">${list.Title} (${list.ItemCount})</option>`;
      }

      // <select>
      //   <option value="volvo">Volvo</option>
      //   <option value="saab">Saab</option>
      //   <option value="opel">Opel</option>
      //   <option value="audi">Audi</option>
      // </select>

      this.domElement.innerHTML = `
      <h1>${this.properties.description}</h1>
      <select>
        ${myListsHtml}
      </select>      
     `;

    }, error => { console.log('Oops error occured', error); });

  }

  private getAllLists() {
    let url = this.context.pageContext.web.absoluteUrl + '/_api/web/lists?$filter=Hidden eq false and BaseTemplate eq 101&$select=Title,ItemCount';
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

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Description'
          },
          groups: [
            {
              groupName: 'General Info',
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Description'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
