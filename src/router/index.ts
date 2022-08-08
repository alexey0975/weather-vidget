import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import MainWeather from '@/views/MainWeather.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: MainWeather,
  },
  {
    path: '/weather-settings',
    name: 'settings',
    component: () => import('../views/WeatherSettings.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
