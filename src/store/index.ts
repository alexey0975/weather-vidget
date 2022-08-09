import getDewPoint from '@/utils/getDewPoint';
import getWindDescr from '@/utils/getWindDescr';
import getWindDirection from '@/utils/getWindDirection';
import { createStore } from 'vuex';
import weatherApi from '@/api/weatherApi';
import { ICityWeather, ILocation } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createCityState = (data: any, searchMethod: 'Name' | 'Coord'): ICityWeather => {
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

const geo = Promise.resolve(navigator.geolocation);

export default createStore({
  state: {
    error: {
      status: false as boolean,
      searchStatus: false as boolean,
      message: '' as string,
    },

    success: false as boolean,

    loading: false as boolean,

    citiesList: [] as ICityWeather[],
    totalCities: 0 as number,
  },

  mutations: {
    setLoading(state) {
      state.loading = true;
    },

    removeLoading(state) {
      state.loading = false;
    },

    setError(state, error) {
      state.error.status = true;
      state.error.message = error.message;
    },

    setSearchError(state, error) {
      state.error.searchStatus = true;
      state.error.message = error.message;
    },

    removeError(state) {
      state.error.status = false;
      state.error.searchStatus = false;
      state.error.message = '';
    },

    setSuccess(state) {
      state.success = true;
    },

    removeSuccess(state) {
      state.success = false;
    },

    updateTotalCities(state) {
      state.totalCities = state.citiesList.length;
    },

    updateOrder(state) {
      state.citiesList = state.citiesList.map((item, index) => ({
        ...item,
        order: index + 1,
      }));
      setLocalStorage(state.citiesList);
    },

    updateWeatherList(state, list) {
      state.citiesList = list;
    },

    deleteCity(state, id: number) {
      state.citiesList = state.citiesList.filter((city) => city.id !== id);
    },

    addWeather(state, weather: ICityWeather) {
      const thisCity = state.citiesList.find((city) => city.id === weather.id);
      if (thisCity) throw Error(`This city has already been added (${thisCity.name}).`);
      state.citiesList.push(weather);
      setLocalStorage(state.citiesList);
    },

    resetCitiesList(state) {
      state.citiesList = [];
      localStorage.removeItem('CitiesList');
    },
  },

  actions: {
    async loadWeather(context, citiesList: ILocation[]) {
      context.commit('setLoading');
      context.commit('removeError');
      context.commit('removeSuccess');
      try {
        const weatherList = await Promise.all(citiesList.map(async (city: ILocation) => {
          let weatherResponse = null;
          const { lat, lon, name } = city;

          if (city.searchMethod === 'Name') weatherResponse = await weatherApi.getWeatherOfName({ city: name });
          if (city.searchMethod === 'Coord') weatherResponse = await weatherApi.getWeatherOfCoord({ lat, lon });
          if (weatherResponse) {
            const { data } = weatherResponse;
            data.order = city.order;
            return createCityState(data, city.searchMethod);
          } throw new Error('Couldn\'t find the city');
        }));

        weatherList.sort((a, b) => (a.order > b.order ? 1 : -1));

        context.commit('updateWeatherList', weatherList);
        context.commit('setSuccess');
      } catch (error) {
        context.commit('setError', error);
      } finally {
        context.commit('removeLoading');
      }
    },

    async loadCity(context, cityName) {
      context.commit('setLoading');
      context.commit('removeError');
      context.commit('removeSuccess');
      try {
        const weatherResponse = await weatherApi.getWeatherOfName({ city: cityName });
        const { data } = weatherResponse;
        data.order = context.state.totalCities + 1;

        const weather = createCityState(data, 'Name');

        context.commit('addWeather', weather);
        context.commit('updateTotalCities');
      } catch (error) {
        context.commit('setSearchError', error);
      } finally {
        context.commit('setSuccess');
        context.commit('removeLoading');
      }
    },

    async loadMyCity(context) {
      const success: PositionCallback = async (pos) => {
        context.commit('setLoading');
        context.commit('removeError');
        context.commit('removeSuccess');
        try {
          const coords = {
            lat: Math.round(pos.coords.latitude * 100) / 100,
            lon: Math.round(pos.coords.longitude * 100) / 100,
          };

          const cityInfo = await weatherApi.getWeatherOfCoord(coords);
          const { data } = cityInfo;
          data.order = context.state.totalCities + 1;

          const weather = createCityState(data, 'Coord');

          context.commit('addWeather', weather);
          context.commit('updateTotalCities');
          context.commit('setSuccess');
        } catch (error) {
          context.commit('setError', error);
        } finally {
          context.commit('removeLoading');
        }
      };

      (await geo).getCurrentPosition(success);
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
