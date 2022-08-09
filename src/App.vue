<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { ILocation } from '@/types';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({

  setup() {
    const store = useStore();
    const storageSitiesList: ILocation[] | null = JSON.parse(localStorage.getItem('CitiesList') || 'null');
    if (storageSitiesList && storageSitiesList.length) {
      store.dispatch('loadWeather', storageSitiesList);
    } else store.dispatch('loadMyCity');
  },
});
</script>

<style lang="scss">
// убрать когда это будет widget
*,
*::after,
*::before {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

button {
  cursor: pointer;
}

button:disabled {
  cursor: auto;
}

.container {
  position: relative;
  max-width: 310px;
  padding: 23px;
  margin: 0 auto;
}

.action-btn {
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
    padding: 17px;
    border: none;
    background-color: transparent;
    z-index: 99;
    cursor: pointer;
    outline: none;
    &:hover &__inner,
    &:focus &__inner {
      transform: scale(1.2);
    }

    &:focus &__inner {
      outline: 1px solid #2c3e50;
      outline-offset: 2px;
    }

    &__inner {
      display: inline-block;
      width: 100%;
      height: 100%;
      background: url('./assets/gear.svg') no-repeat center;
      transition: transform 200ms linear;
    }
  }
</style>
