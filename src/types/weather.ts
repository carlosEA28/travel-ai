export interface WeatherValues {
  temperature: number;
  weatherCode: number;
  // adicionar outros campos conforme necessário
  // Por exemplo:
  // humidity?: number;
  // windSpeed?: number;
  // precipitationProbability?: number;
}

export interface WeatherLocation {
  name: string;
  // adicionar outros campos de localização se necessário
  // Por exemplo:
  // country?: string;
  // region?: string;
  // lat?: number;
  // lon?: number;
}

export interface WeatherData {
  data: {
    values: WeatherValues;
  };
  location: WeatherLocation;
}

export interface WeatherCardProps {
  weather: WeatherData | null;
}
