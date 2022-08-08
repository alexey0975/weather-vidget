<template>
  <form class="search" @submit.prevent="submit">
    <label for="search" class="search__label">
      <input class="search__field"
        v-model="search"
        id="search"
        type="text"
        name="city"
      />
    </label>
    <button class="search__btn" type="submit">Search</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const search = ref('');

    const submit = () => {
      store.dispatch('loadCity', search.value);
    };

    return {
      search,
      submit,
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
      padding: 3px;
      border: 1px solid #2c3e50;
      border-radius: 5px;
    }

    &__btn {
      padding: 10px 12px;
      border: 1px solid #2c3e50;
      border-radius: 5px;
      cursor: pointer;
    }
  }
</style>
