<template>
  <div class="empty">
    <p class="empty__descr">Oh... Cities list is empty.</p>
    <button class="empty__btn btn" @click="addMyCity">Add my city</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useState from '@/hooks.ts/useState';

export default defineComponent({
  setup() {
    const store = useState();
    const { addMyCity } = store;

    return { addMyCity };
  },
});
</script>
