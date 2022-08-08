<template>
  <button class="handle burger"></button>
  <p class="settings__item-name">
    {{city.name}}, {{city.country}}
  </p>
  <button @click.prevent="remove">Remove</button>
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
  .settings {
    &__item-name {
      margin: 0;
      margin-right: auto;
    }
  }

  .burger {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    padding: 5px;
    border: none;
    background: transparent url('../assets/burger.svg') no-repeat center / contain;
  }
</style>
