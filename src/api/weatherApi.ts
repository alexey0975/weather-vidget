import axios from 'axios';
import config from '@/config';
import { ICoordApi, ICityApi } from '@/types';

export default {
  getWeatherOfName({ city, countryCode = '' }: ICityApi) {
    return axios.get(`${config.weatherServer}/data/2.5/weather?q=${city}${countryCode ? `,${countryCode}` : ''}&appid=${config.apiKey}&units=metric`);
  },

  getWeatherOfCoord({ lat, lon }: ICoordApi) {
    return axios.get(`${config.weatherServer}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.apiKey}&units=metric`);
  },

  getCityOfCoord({ lat, lon }: ICoordApi) {
    return axios.get(`${config.weatherServer}/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${config.apiKey}`);
  },
};
