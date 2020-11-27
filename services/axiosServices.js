import axios from 'axios';

export const getService = (route) => {
  return axios.get(`https://epicore.herokuapp.com${route}`);
};
