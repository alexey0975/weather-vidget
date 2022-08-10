import store from '@/store';
import { ICityWeather, ILocation } from '@/types';
import { computed } from 'vue';

export default () => {
  const loading = computed(() => store.state.loading);
  const success = computed(() => store.state.success);
  const error = computed(() => store.state.error);
  const page = computed(() => store.state.page);
  const addMyCity = () => { store.dispatch('loadMyCity'); };

  const changePage = (value: 'Home' | 'Settings') => {
    store.commit('changePage', value);
  };

  const citiesList = computed<ICityWeather[]>({
    get() {
      return store.state.citiesList;
    },
    set(value) {
      store.dispatch('changeOrderCities', value);
    },
  });

  const loadApp = (loadCitylist: ILocation[] | null) => {
    if (loadCitylist && loadCitylist.length) {
      store.dispatch('loadWeather', loadCitylist);
    } else store.dispatch('loadMyCity');
  };

  const removeCity = (id: number) => {
    store.dispatch('deleteCity', id);
  };

  const repairApp = () => {
    if (citiesList.value && citiesList.value.length) {
      store.dispatch('loadWeather', citiesList.value);
    } else store.dispatch('loadMyCity');
  };

  const resetAll = () => {
    store.commit('resetCitiesList');
    store.dispatch('loadMyCity');
  };

  const removeError = () => {
    store.commit('removeError');
  };

  const loadCity = (value : string) => {
    store.dispatch('loadCity', value.trim());
  };

  return {
    citiesList,
    loading,
    error,
    success,
    page,
    changePage,
    removeCity,
    addMyCity,
    repairApp,
    resetAll,
    removeError,
    loadCity,
    loadApp,
  };
};
