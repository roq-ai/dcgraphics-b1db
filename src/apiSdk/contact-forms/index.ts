import axios from 'axios';
import queryString from 'query-string';
import { ContactFormInterface, ContactFormGetQueryInterface } from 'interfaces/contact-form';
import { GetQueryInterface } from '../../interfaces';

export const getContactForms = async (query?: ContactFormGetQueryInterface) => {
  const response = await axios.get(`/api/contact-forms${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createContactForm = async (contactForm: ContactFormInterface) => {
  const response = await axios.post('/api/contact-forms', contactForm);
  return response.data;
};

export const updateContactFormById = async (id: string, contactForm: ContactFormInterface) => {
  const response = await axios.put(`/api/contact-forms/${id}`, contactForm);
  return response.data;
};

export const getContactFormById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/contact-forms/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteContactFormById = async (id: string) => {
  const response = await axios.delete(`/api/contact-forms/${id}`);
  return response.data;
};
