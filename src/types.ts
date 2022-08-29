export interface ICityWeather {
  id: number,
  name: string,
  country: string,
  iconPath: string,
  skyDescr: string,
  windDescr: string,
  windDirection: string,
  temp: number,
  feelsLike: number,
  speedWind: number,
  degWind: number,
  humidity: number,
  pressure: number,
  dewPoint: number,
  visibility: number,
  order: number,
  lat: number,
  lon: number,
  searchMethod: 'Location' | 'Coord',
}

export interface ILocation {
  name: string,
  country: string,
  lat: number,
  lon: number,
  id: number
  searchMethod: 'Location' | 'Coord',
  order: number,
  searchString?: string,
}

export interface ICityApi {
  city: string,
  countryCode?: string,
}

export interface ICoordApi {
  lat: number,
  lon: number,
}
