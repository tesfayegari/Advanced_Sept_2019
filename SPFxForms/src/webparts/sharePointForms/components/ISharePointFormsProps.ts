import { SPHttpClient } from "@microsoft/sp-http";

export interface ISharePointFormsProps {
  description: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;

}
