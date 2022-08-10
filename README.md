# Weather-widget

This is weather widget. 
An example of use can be found [here](https://alexey0975.github.io/weather-vidget/).

## Usage

This is weather widget. For use it just paste in your web-page in head:
```
<script defer="defer" src="https://alexey0975.github.io/weather-vidget/js/app.js"></script>
```
and paste tag:
```
<weather-widget></weather-widget>
```
where you want to use it.

## Development

Register an account at [OpenWeather](https://openweathermap.org/) and get API_KEY.

Create file **.env.local** in root directory put the line:
```
VUE_APP_WEATHER_TOKEN=<API_KEY>
```

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
