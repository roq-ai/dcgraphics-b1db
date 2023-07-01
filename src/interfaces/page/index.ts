import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface PageInterface {
  id?: string;
  content: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface PageGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  organization_id?: string;
}
