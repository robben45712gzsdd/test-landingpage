import axios from 'axios';

const BASE_URL = process.env.API_BASE_URL ;

export function getListGame($axios) {
  return $axios.$get('/Game/GetListGame');
}
