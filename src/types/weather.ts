export interface WeatherValues {
  temperature: number;
  temperatureApparent: number;
  temperatureMin: number;
  temperatureMax: number;
  weatherCode: number;
  weatherCodeMax: number;
  weatherCodeMin: number;
  // Add other fields as needed
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
  // Add other location fields as needed
  lat?: number;
  lon?: number;
  country?: string;
  region?: string;
}

export interface WeatherData {
  current?: {
    values: WeatherValues;
  };
  location?: WeatherLocation;
  forecast?: WeatherTimelines;
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
