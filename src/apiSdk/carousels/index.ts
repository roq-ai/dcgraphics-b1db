import axios from 'axios';
import queryString from 'query-string';
import { CarouselInterface, CarouselGetQueryInterface } from 'interfaces/carousel';
import { GetQueryInterface } from '../../interfaces';

export const getCarousels = async (query?: CarouselGetQueryInterface) => {
  const response = await axios.get(`/api/carousels${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCarousel = async (carousel: CarouselInterface) => {
  const response = await axios.post('/api/carousels', carousel);
  return response.data;
};

export const updateCarouselById = async (id: string, carousel: CarouselInterface) => {
  const response = await axios.put(`/api/carousels/${id}`, carousel);
  return response.data;
};

export const getCarouselById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/carousels/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCarouselById = async (id: string) => {
  const response = await axios.delete(`/api/carousels/${id}`);
  return response.data;
};
