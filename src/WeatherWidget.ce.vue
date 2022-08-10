<template>
  <div class="container">
    <main-weather v-if="page === 'Home'" />
    <weather-settings v-if="page === 'Settings'" />
  </div>
</template>

<script lang="ts">
import { ILocation } from '@/types';
import { defineComponent } from 'vue';
import MainWeather from './pages/MainWeather.vue';
import WeatherSettings from './pages/WeatherSettings.vue';
import useState from './hooks.ts/useState';

export default defineComponent({
  components: { MainWeather, WeatherSettings },

  setup() {
    const store = useState();
    const { page, loadApp } = store;

    const storageSitiesList: ILocation[] | null = JSON.parse(
      localStorage.getItem('CitiesList') || 'null',
    );

    loadApp(storageSitiesList);

    return { page };
  },
});
</script>

<style lang="scss">
@import '@/assets/style/style.scss';
</style>
