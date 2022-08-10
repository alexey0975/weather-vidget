<template>
  <button @click="changePage('Settings')" class="action-btn">
    <span class="action-btn__inner">
      <icon-box width="1000" height="1000" x="0px" y="0px" viewBox="0 0 1000 1000">
        <icon-gear />
      </icon-box>
    </span>
  </button>

  <ul v-if="citiesList.length && success" class="city-list">
    <li class="city-list__item" v-for="city in citiesList" :key="city.id">
      <weather-card :city="city" />
    </li>
  </ul>

  <div class="loader-wrapper" v-if="loading">
    <loader-component />
  </div>

  <error-component v-if="error.status" />

  <empty-list v-if="!citiesList.length && !loading && !error" />
</template>

<script lang="ts">
import WeatherCard from '@/components/WeatherCard.vue';
import EmptyList from '@/components/EmptyList.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
import IconBox from '@/components/IconBox.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import IconGear from '@/icons/IconGear.vue';
import { defineComponent } from 'vue';
import useState from '@/hooks.ts/useState';

export default defineComponent({
  components: {
    WeatherCard,
    EmptyList,
    LoaderComponent,
    ErrorComponent,
    IconGear,
    IconBox,
  },

  setup() {
    const store = useState();
    const {
      citiesList, loading, success, error, changePage,
    } = store;

    return {
      citiesList,
      loading,
      error,
      success,
      changePage,
    };
  },
});
</script>
