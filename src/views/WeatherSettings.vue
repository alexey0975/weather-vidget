<template>
  <div class="settings">
    <h1 class="settings__title">Settings</h1>

    <router-link class="action-btn" :to="{ name: 'home' }" >
        <span class="action-btn__inner action-btn__inner_close" />
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

    <div v-if="loading && !citiesList.length" class="loader-wrapper">
      <loader-component />
    </div>

    <empty-list v-if="!loading && !citiesList.length" />

    <search-city />
  </div>
</template>

<script lang="ts">
import CityItem from '@/components/CityItem.vue';
import SearchCity from '@/components/SearchCity.vue';
import EmptyList from '@/components/EmptyList.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import draggable from 'vuedraggable';

export default defineComponent({
  components: {
    CityItem, SearchCity, EmptyList, draggable, LoaderComponent,
  },

  setup() {
    const store = useStore();
    const loading = computed(() => store.state.loading);
    const citiesList = computed({
      get() {
        return store.state.citiesList;
      },
      set(value) {
        store.dispatch('changeOrderCities', value);
      },
    });
    return {
      loading,
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
    border: 1px solid var(--main-color);
    border-radius: 5px;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
</style>
