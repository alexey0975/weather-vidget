<template>
  <small v-if="error.searchStatus" class="search__error"
    >Error: {{ error.message }}</small
  >

  <form class="search" @submit.prevent="submit">
    <label for="search" class="search__label">
      <input
        class="search__field"
        v-model="search"
        id="search"
        type="text"
        name="city"
        placeholder="Enter city..."
        @focus="removeError"
      />
    </label>

    <button
      :disabled="!search.trim()"
      class="btn btn_search"
      type="submit"
      title="Add..."
    >
      <span v-if="!loading" class="btn__inner btn__inner_search">
        <icon-box width="21px" height="21px" viewBox="0 0 21 21">
          <icon-add />
        </icon-box>
      </span>

      <loader-component v-else />
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useState from '@/hooks.ts/useState';
import IconAdd from '@/icons/IconAdd.vue';
import LoaderComponent from './LoaderComponent.vue';
import IconBox from './IconBox.vue';

export default defineComponent({
  components: { LoaderComponent, IconBox, IconAdd },

  setup() {
    const store = useState();
    const search = ref('');
    const {
      error, loading, loadCity, removeError,
    } = store;

    const submit = () => {
      loadCity(search.value);
    };

    return {
      error,
      search,
      loading,
      removeError,
      submit,
    };
  },
});
</script>
