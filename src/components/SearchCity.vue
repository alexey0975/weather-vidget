<template>
  <small v-if="error.searchStatus" class="search__error">Error: {{ error.message }}</small>

  <form class="search" @submit.prevent="submit">
    <label for="search" class="search__label">
      <input class="search__field"
        v-model="search"
        id="search"
        type="text"
        name="city"
        placeholder="Enter city..."
        @focus="fieldFocus"
      />
    </label>

    <button :disabled="!search.trim()" class="btn btn_search" type="submit" title="Add...">
      <span v-if="!loading" class="btn__inner btn__inner_search"></span>

      <loader-component v-else />
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import LoaderComponent from './LoaderComponent.vue';

export default defineComponent({
  components: { LoaderComponent },
  setup() {
    const store = useStore();
    const search = ref('');
    const loading = computed<boolean>(() => store.state.loading);
    const error = computed(() => store.state.error);

    const fieldFocus = () => {
      store.commit('removeError');
    };

    const submit = () => {
      store.dispatch('loadCity', search.value);
    };

    return {
      error,
      search,
      submit,
      loading,
      fieldFocus,
    };
  },
});
</script>

<style lang="scss">
  .search {
      display: flex;

    &__label {
      flex: 1 1 auto;
      margin-right: 5px;
    }

    &__field {
      width: 100%;
      height: 100%;
      padding: 10px;
      font-size: 16px;
      border: 1px solid var(--main-color);
      border-radius: 5px;
    }

    &__btn {
      padding: 10px 12px;
      border: 1px solid var(--main-color);
      border-radius: 5px;
      cursor: pointer;
    }

    &__error {
      font-weight: bold;
      color: crimson;
    }
  }
</style>
