<template>
  <div class="settings">
    <h1 class="settings__title">Settings</h1>

    <router-link class="action-btn" :to="{ name: 'home' }">
      <span>Закрыть</span>
    </router-link>

    <draggable
      v-if="citiesList.length"
      v-model="citiesList" item-key="id"
      tag='ul' class="settings__list"
      handle=".handle"
    >
      <template #item="{ element }">
          <li class="settings__item">
            <city-item :city="element" />
          </li>
      </template>
    </draggable>

    <empty-list v-else />

    <search-city />
  </div>
</template>

<script lang="ts">
import CityItem from '@/components/CityItem.vue';
import SearchCity from '@/components/SearchCity.vue';
import EmptyList from '@/components/EmptyList.vue';
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import draggable from 'vuedraggable';

export default defineComponent({
  components: {
    CityItem, SearchCity, EmptyList, draggable,
  },

  setup() {
    const store = useStore();
    const citiesList = computed({
      get() {
        return store.state.citiesWeather;
      },
      set(value) {
        store.dispatch('changeOrderCities', value);
      },
    });
    return {
      citiesList,
    };
  },
});
</script>

<style lang="scss">
.settings {
  &__title {
    margin: 0;
    margin-bottom: 20px;
    font-size: 20px;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    margin-bottom: 20px;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 5px 7px;
    border: 1px solid #2c3e50;
    border-radius: 5px;
    &:not(:last-child) {
      margin-bottom: 3px;
    }
  }
}
</style>
