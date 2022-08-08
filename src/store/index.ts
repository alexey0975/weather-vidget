import getDewPoint from '@/utils/getDewPoint';
import getWindDescr from '@/utils/getWindDescr';
import getWindDirection from '@/utils/getWindDirection';
import { createStore } from 'vuex';
import weatherApi from '@/api/weatherApi';
import { ICityWeather, ILocation } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createWeatherState = (data: any, searchMethod: 'Name' | 'Coord'): ICityWeather => {
  const [weatherDescr] = data.weather;
  return {
    id: data.id,
    name: data.name,
    country: data.sys.country,
    iconPath: `http://openweathermap.org/img/wn/${weatherDescr.icon}@2x.png`,
    skyDescr: weatherDescr.description[0].toUpperCase() + weatherDescr.description.slice(1),
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    speedWind: data.wind.speed,
    windDirection: getWindDirection(data.wind.deg),
    degWind: data.wind.deg,
    windDescr: getWindDescr(data.wind.speed),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    dewPoint: getDewPoint(data.main.temp, data.main.humidity),
    visibility: Math.round(data.visibility / 100) / 10,
    order: data.order,
    lat: data.coord.lat,
    lon: data.coord.lon,
    searchMethod,
  };
};

const setLocalStorage = (list: ICityWeather[]) => {
  const setList: ILocation[] = list.map((item) => ({
    name: item.name,
    lat: item.lat,
    lon: item.lon,
    id: item.id,
    searchMethod: item.searchMethod,
    order: item.order,
  }));

  localStorage.setItem('CitiesList', JSON.stringify(setList));
};

const geo = navigator.geolocation;

export default createStore({
  state: {
    citiesWeather: [] as ICityWeather[],
    totalCities: 0 as number,
  },

  mutations: {
    updateTotalCities(state) {
      state.totalCities = state.citiesWeather.length;
    },

    updateOrder(state) {
      state.citiesWeather = state.citiesWeather.map((item, index) => ({
        ...item,
        order: index + 1,
      }));
      setLocalStorage(state.citiesWeather);
    },

    updateWeatherList(state, list) {
      state.citiesWeather = list;
    },

    deleteCity(state, id: number) {
      state.citiesWeather = state.citiesWeather.filter((city) => city.id !== id);
    },

    addWeather(state, weather: ICityWeather) {
      if (state.citiesWeather.find((city) => city.id === weather.id)) return;
      state.citiesWeather.push(weather);
      setLocalStorage(state.citiesWeather);
    },
  },

  actions: {
    async loadWeather(context, citiesList: ILocation[]) {
      const weatherList = await Promise.all(citiesList.map(async (city: ILocation) => {
        let weatherResponse = null;
        const { lat, lon, name } = city;

        if (city.searchMethod === 'Name') weatherResponse = await weatherApi.getWeatherOfName({ city: name });
        if (city.searchMethod === 'Coord') weatherResponse = await weatherApi.getWeatherOfCoord({ lat, lon });
        if (weatherResponse) {
          const { data } = weatherResponse;
          data.order = city.order;

          return createWeatherState(data, city.searchMethod);
        } throw new Error('Не удалось найти город');
      }));

      weatherList.sort((a, b) => (a.order > b.order ? 1 : -1));
      context.commit('updateWeatherList', weatherList);
    },

    async loadCity(context, cityName) {
      const weatherResponse = await weatherApi.getWeatherOfName({ city: cityName });
      const { data } = weatherResponse;
      data.order = context.state.totalCities + 1;

      const weather = createWeatherState(data, 'Name');

      context.commit('addWeather', weather);
      context.commit('updateTotalCities');
    },

    loadMyCity(context) {
      const success: PositionCallback = async (pos) => {
        const coords = {
          lat: Math.round(pos.coords.latitude * 100) / 100,
          lon: Math.round(pos.coords.longitude * 100) / 100,
        };

        const cityInfo = await weatherApi.getWeatherOfCoord(coords);
        const { data } = cityInfo;
        data.order = context.state.totalCities + 1;

        const weather = createWeatherState(data, 'Coord');

        context.commit('addWeather', weather);
        context.commit('updateTotalCities');
      };

      const error: PositionErrorCallback = (err) => {
        console.warn(err);
      };

      geo.getCurrentPosition(success, error);
    },

    changeOrderCities(context, list) {
      context.commit('updateWeatherList', list);
      context.commit('updateOrder');
    },

    deleteCity(contex, id) {
      contex.commit('deleteCity', id);
      contex.commit('updateOrder');
      contex.commit('updateTotalCities');
    },
  },
});
