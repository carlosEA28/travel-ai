export interface WeatherValues {
  temperature: number;
  temperatureApparent: number;
  temperatureMin: number;
  temperatureMax: number;
  weatherCode: number;
  weatherCodeMax: number;
  weatherCodeMin: number;
}

export interface WeatherTimeline {
  time: string;
  values: WeatherValues;
}

export interface WeatherTimelines {
  minutely?: WeatherTimeline[];
  hourly?: WeatherTimeline[];
  daily?: WeatherTimeline[];
}

export interface WeatherLocation {
  name: string;

  lat?: number;
  lon?: number;
  country?: string;
  region?: string;
}

export interface WeatherData {
  current?: {
    values: WeatherValues;
  };
  data?: {
    values: WeatherValues;
    location: WeatherLocation;
  };
  values?: WeatherValues;
  location?: WeatherLocation;
  forecast?: WeatherTimelines;
  temp?: number;
  temp_c?: number;
  code?: number;
}

export interface WeatherCardProps {
  weather: WeatherData | null;
}

// Types for the forecast component
export interface ForecastDay {
  time: string;
  values: {
    temperature: number;
    temperatureApparent: number;
    temperatureMin: number;
    temperatureMax: number;
    weatherCode: number;
    weatherCodeMax: number;
    weatherCodeMin: number;
  };
}
