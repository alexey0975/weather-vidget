<template>
  <div class="settings">
    <h1 class="settings__title">Settings</h1>

    <button @click="changePage('Home')" class="action-btn">
      <span class="action-btn__inner action-btn__inner_set">
        <icon-box x="0px" y="0px" width="26" height="26" viewBox="0 0 26 26">
          <icon-close />
        </icon-box>
      </span>
    </button>

    <draggable
      v-if="citiesList.length"
      v-model="citiesList"
      item-key="id"
      tag="ul"
      class="settings__list"
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
import SearchCity from '@/components/SearchCity.vue';
import EmptyList from '@/components/EmptyList.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
import { defineComponent } from 'vue';
import useState from '@/hooks.ts/useState';
import draggable from 'vuedraggable';
import CityItem from '@/components/CityItem.vue';
import IconBox from '@/components/IconBox.vue';
import IconClose from '@/icons/IconClose.vue';

export default defineComponent({
  components: {
    CityItem,
    SearchCity,
    EmptyList,
    draggable,
    LoaderComponent,
    IconBox,
    IconClose,
  },

  setup() {
    const store = useState();
    const { loading, citiesList, changePage } = store;

    return {
      loading,
      citiesList,
      changePage,
    };
  },
});
</script>
