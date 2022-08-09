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
    const storageSitiesList: ILocation[] | null = JSON.parse(
      localStorage.getItem('CitiesList') || 'null',
    );

    if (storageSitiesList && storageSitiesList.length) {
      store.dispatch('loadWeather', storageSitiesList);
    } else store.dispatch('loadMyCity');
  },
});
</script>

<style lang="scss">
:root {
  --main-color: #2c3e50;
}

*,
*::after,
*::before {
  box-sizing: border-box;
}

body {
  margin: 0;
}

weather-widget {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--main-color);
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: var(--main-color);

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
    outline: 1px solid var(--main-color);
    outline-offset: 2px;
  }

  &__inner {
    display: inline-block;
    width: 100%;
    height: 100%;
    transition: transform 200ms linear;

    &_set {
      background: url('./assets/gear.svg') no-repeat center;
    }

    &_close {
      background: url('./assets/close.svg') no-repeat center;
    }
  }
}

.btn {
  position: relative;
  width: 30px;
  height: 30px;
  padding: 5px;
  border: none;
  background-color: transparent;
  transition: transform 200ms linear;

  &:hover {
    transform: scale(1.1);
  }

  &_handle {
    cursor: all-scroll;
  }

  &_search {
    width: 40px;
    height: 40px;
    border: 1px solid var(--main-color);
    border-radius: 5px;

    &:disabled {
      transform: none;
      &::before {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          content: '';
          background-color: rgba($color: #fff, $alpha: .7);
          z-index: 99;
        }
    }
  }

  &__inner {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: transparent no-repeat center / contain;

    &_handle {
      background-image: url('./assets/burger.svg');
    }

    &_remove {
      background-image: url('./assets/remove.svg');
    }

    &_search {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background-image: url('./assets/add.svg');

    }
  }
}
</style>
