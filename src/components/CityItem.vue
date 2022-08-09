<template>
  <button class="handle btn">
    <span class="btn__inner btn__inner_handle" />
  </button>

  <p class="settings__item-name">
    {{city.name}}, {{city.country}}
  </p>

  <button class="btn" @click.prevent="remove" >
    <span class="btn__inner btn__inner_remove" />
  </button>
</template>

<script lang="ts">
import { ICityWeather } from '@/types';
import { defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  props: {
    city: { type: Object as PropType<ICityWeather>, required: true },
  },

  setup(props) {
    const store = useStore();
    const remove = () => {
      store.dispatch('deleteCity', props.city.id);
    };

    return {
      remove,
    };
  },
});
</script>

<style lang="scss">
  .handle {
    margin-right: 10px;
  }

  .settings {
    &__item-name {
      margin: 0;
      margin-right: auto;
    }
  }
</style>
