<template>
    <router-link class="action-btn" :to="{ name: 'settings' }">
      <span class="action-btn__inner"></span>
    </router-link>
    <ul v-if="weatherList.length" class="city-list">
      <li
        class="city-list__item"
        v-for="city in weatherList"
        :key="city.id"
      >
        <weather-card :city="city" />
      </li>
    </ul>
    <empty-list v-else />
</template>

<script lang="ts">
import WeatherCard from '@/components/WeatherCard.vue';
import EmptyList from '@/components/EmptyList.vue';
import { ICityWeather } from '@/types';
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: { WeatherCard, EmptyList },

  setup() {
    const store = useStore();
    const weatherList = computed<ICityWeather[]>(() => store.state.citiesWeather);

    return { weatherList };
  },
});
</script>

<style lang="scss">
  .city-list {
    margin: 0;
    padding: 0;
    list-style: none;

    &__item {
      &:not(:last-child) {
        margin-bottom: 60px;
      }
    }
  }
</style>
