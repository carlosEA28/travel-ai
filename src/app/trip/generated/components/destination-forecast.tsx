import { getDestinationForecast } from "@/actions/trip/get-destination-forecast";
import { useEffect, useState } from "react";

interface DestinationForecastComponentProps {
  day: string;
  weather: string;
  maxTemperature: string;
  minTemperature: string;
}

const DestinationForecastComponent = () => {
  const [forecast, setForecast] = useState<
    DestinationForecastComponentProps[] | null
  >(null);

  useEffect(() => {
    getDestinationForecast("Porto Alegre").then((data) => {
      setForecast(data);
    });
  }, []);

  return (
    <div>
      {forecast?.map((item) => (
        <div key={item.day}>
          <p>{item.day}</p>
          <p>{item.weather}</p>
          <p className="text-sm">
            {item.maxTemperature}°{" "}
            <span className="">{item.minTemperature}°</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default DestinationForecastComponent;
