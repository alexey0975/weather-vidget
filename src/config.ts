const weatherApiKey = process.env.VUE_APP_WEATHER_TOKEN;
const weatherServer = 'https://api.openweathermap.org';
export default {
  apiKey: weatherApiKey,
  weatherServer,
};
