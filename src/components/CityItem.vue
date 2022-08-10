<template>
  <button class="handle btn">
    <span class="btn__inner">
      <icon-box x="0px" y="0px" width="122.879px" height="103.609px" viewBox="0 0 122.879 103.609">
        <icon-burger />
      </icon-box>
    </span>
  </button>

  <p class="settings__item-name">{{ city.name }}, {{ city.country }}</p>

  <button class="btn" @click.prevent="remove">
    <span class="btn__inner btn__inner_remove">
      <icon-box x="0px" y="0px" width="482.428px" height="482.429px" viewBox="0 0 482.428 482.429">
        <icon-remove />
      </icon-box>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ICityWeather } from '@/types';
import useState from '@/hooks.ts/useState';
import IconRemove from '@/icons/IconRemove.vue';
import IconBurger from '@/icons/IconBurger.vue';
import IconBox from './IconBox.vue';

export default defineComponent({

  components: { IconBox, IconRemove, IconBurger },

  props: {
    city: { type: Object as PropType<ICityWeather>, required: true },
  },

  setup(props) {
    const store = useState();
    const { removeCity } = store;
    const remove = () => {
      removeCity(props.city.id);
    };

    return {
      remove,
    };
  },
});
</script>
