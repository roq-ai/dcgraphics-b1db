import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface CarouselInterface {
  id?: string;
  image: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface CarouselGetQueryInterface extends GetQueryInterface {
  id?: string;
  image?: string;
  organization_id?: string;
}
