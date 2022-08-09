<template>
  <div class="error-block">
    <p class="error-block__title">
      <span>Error:</span>
      <span class="error-block__message">{{ error.message }}</span>
    </p>
    <button class="btn error-block__btn" @click="tryAgain">Try again</button>
    <button class="btn error-block__btn error-block__btn_warn" @click="reset">Reset widget</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({

  setup() {
    const store = useStore();
    const error = computed(() => store.state.error);
    const citiesList = computed(() => store.state.citiesList);

    const tryAgain = () => {
      if (citiesList.value && citiesList.value.length) {
        store.dispatch('loadWeather', citiesList.value);
      } else store.dispatch('loadMyCity');
    };

    const reset = () => {
      store.commit('resetCitiesList');
      store.dispatch('loadMyCity');
    };

    return {
      error,
      tryAgain,
      reset,
    };
  },
});
</script>

<style lang="scss">
  .error-block {
    display: flex;
    flex-direction: column;
    font-size: 16px;

    &__title {
      font-weight: bold;
    }

    &__message {
      color: crimson;
    }

    &__btn {
      width: 100%;
      height: auto;
      padding: 10px;
      border: 1px solid var(--main-color);
      border-radius: 5px;
      font-size: 16px;
      line-height: 1.6;
      transition: background-color 200ms linear;

      &:not(:last-of-type) {
        margin-bottom: 8px;
      }

      &:hover,
      &:focus {
        color: #fff;
        background-color: var(--main-color);
        transform: none;
      }

      &_warn {
        color: crimson;
        border-color: crimson;

        &:hover,
        &:focus {
          background-color: crimson;
        }
      }
    }
  }
</style>
