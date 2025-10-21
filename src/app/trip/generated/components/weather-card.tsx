"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  convertWeatherCodeToDescription,
  getWeatherSvgPath,
} from "@/helpers/covert-weatherCode";
import Image from "next/image";
import { WeatherCardProps } from "@/types/weather";

const WeatherCardComponent = ({ weather }: WeatherCardProps) => {
  if (!weather) return null;

  return (
    <Card>
      <CardContent className="flex items-center gap-6">
        {/* CURRENT WEATHER */}
        <div>
          <div className="flex gap-1">
            <p className="text-4xl">{weather.data.values.temperature}° </p>
            <div className="relative h-10 w-10">
              <Image
                src={getWeatherSvgPath(weather.data.values.weatherCode)}
                alt={convertWeatherCodeToDescription(
                  weather.data.values.weatherCode
                )}
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-base">{weather.location.name.split(",")[0]}</p>
          <p className="text-sm">
            {convertWeatherCodeToDescription(weather.data.values.weatherCode)}
          </p>
        </div>

        {/* FORECAST */}
        <div className="flex gap-5">
          {/* <DestinationForecastComponent /> */}
          {/* ...restante dos dias */}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCardComponent;
