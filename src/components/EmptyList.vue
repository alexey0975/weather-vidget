<template>
  <div class="empty">
    <p class="empty__descr">Oh... Cities list is empty.</p>
    <button class="empty__btn btn" @click="addCity">Add my city</button>
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

<style lang="scss">
.loader-wrapper {
  width: 250px;
  height: 250px;
}

.empty {
  padding: 20px 0;

  &__descr {
    margin: 0;
    margin-bottom: 20px;
    font-size: 20px;
  }

  &__btn {
    width: 100%;
    height: auto;
    padding: 10px;
    font-size: 20px;
    border: 2px solid var(--main-color);
    border-radius: 5px;
    transition: background-color 200ms linear;

    &:hover {
      transform: none;
      background-color: var(--main-color);
      color: #fff;
    }
  }
}
</style>
