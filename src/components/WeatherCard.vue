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
      <div class="temperature">
        {{ city.temp }}&deg;С
      </div>
    </div>

    <p class="other-info">
      Feels like {{city.feelsLike}}&deg;C. {{city.skyDescr}}. {{city.windDescr}}
    </p>

    <ul class="details">
      <li class="details__item">
        <div class="wind">{{city.speedWind}}m/s {{city.windDirection}}</div>
      </li>
      <li class="details__item">
        <div class="pressure">{{city.pressure}}hPa</div>
      </li>
      <li class="details__item">
        <div class="humidity">{{city.humidity}}%</div>
      </li>
      <li class="details__item">
        <div class="dew-point">{{city.dewPoint}}&deg;C</div>
      </li>
      <li class="details__item">
        <div class="visibility">{{city.visibility}} km</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ICityWeather } from '@/types';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    city: { type: Object as PropType<ICityWeather>, required: true },
  },

  setup(props) {
    const degWindDir = `${props.city.degWind + 180}deg`;

    return {
      degWindDir,
    };
  },
});
</script>

<style lang="scss">
  .country {
    display: flex;
    font-weight: bold;
    margin-bottom: 25px;
    &__name {
      margin-right: 15px;
    }
  }

  .main-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 45px;
  }

  .temperature {
    padding: 25px;
    font-size: 45px;
  }

  .other-info {
    margin: 0;
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 1.5;
  }

  .details {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 16px;

    &__item {
      &:not(:last-child) {
        margin-right: 20px;
      }

      &:nth-last-child(n+3) {
        margin-bottom: 20px;
      }
    }

    .wind {
      position: relative;
      padding-left: 25px;

      &::before {
        position: absolute;
        left: 0;
        bottom: 2px;
        width: 20px;
        height: 20px;
        content: '';
        background: url('../assets/arrow.svg') no-repeat center;
        transform: rotate(v-bind(degWindDir));
      }
    }

    .pressure {
      position: relative;
      padding-left: 30px;

      &::before {
        position: absolute;
        left: 0;
        bottom: 2px;
        width: 20px;
        height: 20px;
        content: '';
        background: url('../assets/pressure.svg') no-repeat center;
      }
    }

    .humidity {
      &::before {
        content: 'Humidity: ';
      }
    }

    .dew-point {
      &::before {
        content: 'Dew point: ';
      }
    }

    .visibility {
      &::before {
        content: 'Visibility: ';
      }
    }
  }
</style>
