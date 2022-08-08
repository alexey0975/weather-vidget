<template>
  <div>
    <p>Oh... Cities list is empty.</p>
    <button @click="addCity">Add my city</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const addCity = () => { store.dispatch('loadMyCity'); };

    return { addCity };
  },
});
</script>
