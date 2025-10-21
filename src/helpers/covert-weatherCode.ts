interface WeatherInfo {
  text: string;
  emoji: string;
  svgPath: string;
}

const weather_code_map: Record<number, WeatherInfo> = {
  // Céu limpo e ensolarado
  0: { text: "Unknown", emoji: "", svgPath: "/ensolarado.svg" },
  1000: { text: "Clear", emoji: "☀️", svgPath: "/ensolarado.svg" },

  // Nublado
  1001: { text: "Cloudy", emoji: "☁️", svgPath: "/nublado.svg" },
  1102: { text: "Mostly Cloudy", emoji: "☁️", svgPath: "/nublado.svg" },

  // Parcialmente nublado/ensolarado
  1100: {
    text: "Mostly Clear",
    emoji: "🌤️",
    svgPath: "/parcialmente_nublado.svg",
  },
  1101: {
    text: "Partly Cloudy",
    emoji: "⛅️",
    svgPath: "/sol_entre_nuvens.svg",
  },

  // Neblina
  2000: { text: "Fog", emoji: "🌫️", svgPath: "/neblina.svg" },
  2100: { text: "Light Fog", emoji: "🌫️", svgPath: "/neblina.svg" },

  // Vento
  3000: { text: "Light Wind", emoji: "💨", svgPath: "/ventania.svg" },
  3001: { text: "Wind", emoji: "💨", svgPath: "/ventania.svg" },
  3002: { text: "Strong Wind", emoji: "💨", svgPath: "/ventania.svg" },

  // Chuva
  4000: { text: "Drizzle", emoji: "🌧️", svgPath: "/chuva_forte.svg" },
  4001: { text: "Rain", emoji: "🌧️", svgPath: "/chuva_forte.svg" },
  4200: { text: "Light Rain", emoji: "🌧️", svgPath: "/chuva_forte.svg" },
  4201: { text: "Heavy Rain", emoji: "🌧️", svgPath: "/chuva_forte.svg" },

  // Neve
  5000: { text: "Snow", emoji: "❄️", svgPath: "/neve.svg" },
  5001: { text: "Flurries", emoji: "❄️", svgPath: "/neve_moderada.svg" },
  5100: { text: "Light Snow", emoji: "❄️", svgPath: "/neve.svg" },
  5101: { text: "Heavy Snow", emoji: "❄️", svgPath: "/neve_moderada.svg" },

  // Chuva congelante
  6000: { text: "Freezing Drizzle", emoji: "🌧️❄️", svgPath: "/granizo.svg" },
  6001: { text: "Freezing Rain", emoji: "🌧️❄️", svgPath: "/granizo.svg" },
  6200: { text: "Light Freezing Rain", emoji: "🌧️❄️", svgPath: "/granizo.svg" },
  6201: { text: "Heavy Freezing Rain", emoji: "🌧️❄️", svgPath: "/granizo.svg" },

  // Granizo
  7000: { text: "Ice Pellets", emoji: "🧊", svgPath: "/granizo.svg" },
  7101: { text: "Heavy Ice Pellets", emoji: "🧊", svgPath: "/granizo.svg" },
  7102: { text: "Light Ice Pellets", emoji: "🧊", svgPath: "/granizo.svg" },

  // Tempestade
  8000: { text: "Thunderstorm", emoji: "⛈️", svgPath: "/tempestade.svg" },
};

export function getWeatherInfo(code: number): WeatherInfo {
  return weather_code_map[code] || weather_code_map[0]; // Retorna desconhecido se o código não for encontrado
}

export function convertWeatherCodeToDescription(code: number): string {
  const { text } = getWeatherInfo(code);
  return ` ${text}`;
}

export function getWeatherSvgPath(code: number): string {
  return getWeatherInfo(code).svgPath;
}
