<template>
    <router-link class="action-btn" :to="{ name: 'settings' }">
      <span class="action-btn__inner action-btn__inner_set"></span>
    </router-link>
    <ul v-if="weatherList.length && success" class="city-list">
      <li
        class="city-list__item"
        v-for="city in weatherList"
        :key="city.id"
      >
        <weather-card :city="city" />
      </li>
    </ul>
    <div class="loader-wrapper" v-if="loading">
      <loader-component />
    </div>

    <error-component v-if="error.status" />

    <empty-list v-if="!weatherList.length && !loading" />
</template>

<script lang="ts">
import WeatherCard from '@/components/WeatherCard.vue';
import EmptyList from '@/components/EmptyList.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import { ICityWeather } from '@/types';
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    WeatherCard, EmptyList, LoaderComponent, ErrorComponent,
  },

  setup() {
    const store = useStore();
    const weatherList = computed<ICityWeather[]>(() => store.state.citiesList);
    const loading = computed(() => store.state.loading);
    const success = computed(() => store.state.success);
    const error = computed(() => store.state.error);

    return {
      weatherList, loading, error, success,
    };
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
        margin-bottom: 45px;
      }
    }
  }
</style>
