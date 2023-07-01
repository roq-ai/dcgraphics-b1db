import { CarouselInterface } from 'interfaces/carousel';
import { ContactFormInterface } from 'interfaces/contact-form';
import { GalleryInterface } from 'interfaces/gallery';
import { PageInterface } from 'interfaces/page';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  carousel?: CarouselInterface[];
  contact_form?: ContactFormInterface[];
  gallery?: GalleryInterface[];
  page?: PageInterface[];
  user?: UserInterface;
  _count?: {
    carousel?: number;
    contact_form?: number;
    gallery?: number;
    page?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
