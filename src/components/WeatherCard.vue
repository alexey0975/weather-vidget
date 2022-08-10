<template>
  <div class="card">
    <div class="country">
      <span class="country__name">{{ city.name }},</span>
      <span class="country__code">{{ city.country }}</span>
    </div>

    <div class="main-info">
      <div class="cloud-cover">
        <img :src="city.iconPath" :alt="city.skyDescr" />
      </div>
      <div class="temperature">{{ city.temp }}&deg;С</div>
    </div>

    <p class="other-info">
      Feels like {{ city.feelsLike }}&deg;C. {{ city.skyDescr }}. {{ city.windDescr }}
    </p>

    <ul class="details">
      <li class="details__item">
        <div class="wind">
          <span class="details__icon" :style="degWindDirStyle">
            <icon-box x="0px" y="0px" viewBox="0 0 490 490" fill="currentColor">
              <icon-arrow />
            </icon-box>
          </span>

          <span class="wind__inner">
            {{ city.speedWind }}m/s {{ city.windDirection }}
          </span>
        </div>
      </li>

      <li class="details__item">
        <div class="pressure">
          <span class="details__icon pressure__icon">
            <icon-box width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <icon-pressure />
            </icon-box>
          </span>

          <span class="pressure__inner">
            {{ city.pressure }}hPa
          </span>
        </div>
      </li>

      <li class="details__item">
        <div class="humidity">{{ city.humidity }}%</div>
      </li>

      <li class="details__item">
        <div class="dew-point">{{ city.dewPoint }}&deg;C</div>
      </li>

      <li class="details__item">
        <div class="visibility">{{ city.visibility }} km</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ICityWeather } from '@/types';
import { defineComponent, PropType } from 'vue';
import IconArrow from '@/icons/IconArrow.vue';
import IconPressure from '@/icons/IconPressure.vue';
import IconBox from './IconBox.vue';

export default defineComponent({
  components: { IconArrow, IconPressure, IconBox },

  props: {
    city: { type: Object as PropType<ICityWeather>, required: true },
  },

  setup(props) {
    const degWindDirStyle = `transform: rotate(${props.city.degWind + 180}deg);`;

    return {
      degWindDirStyle,
    };
  },
});
</script>
