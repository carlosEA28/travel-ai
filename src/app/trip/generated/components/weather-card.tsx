"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  convertWeatherCodeToDescription,
  getWeatherSvgPath,
} from "@/helpers/covert-weatherCode";
import Image from "next/image";
import { WeatherCardProps } from "@/types/weather";

const WeatherCardComponent: React.FC<WeatherCardProps> = ({ weather }) => {
  if (!weather?.current?.values || !weather.location) {
    return null;
  }

  const { temperature, weatherCode } = weather.current.values;
  const locationName = weather.location.name?.split(",")[0] || 'Unknown Location';
  const weatherDescription = convertWeatherCodeToDescription(weatherCode);

  return (
    <Card>
      <CardContent className="flex items-center gap-6">
        <div>
          <div className="flex gap-1">
            <p className="text-4xl">{temperature}°</p>
            <div className="relative h-10 w-10">
              <Image
                src={getWeatherSvgPath(weatherCode)}
                alt={weatherDescription}
                fill
                className="object-contain"
                sizes="2.5rem"
                priority={false}
              />
            </div>
          </div>
          <p className="text-base">{locationName}</p>
          <p className="text-sm">{weatherDescription}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCardComponent;
