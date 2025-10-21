interface DestinationForecastComponentProps {
  day: string;
  weather: string;
  maxTemperature: string;
  minTemperature: string;
}

const DestinationForecastComponent = ({
  day,
  weather,
  maxTemperature,
  minTemperature,
}: DestinationForecastComponentProps) => {
  return (
    <div className="text-center">
      <p>{day}</p>
      <p>{weather}</p>
      <p className="text-sm">
        {maxTemperature}° <span className="">{minTemperature}°</span>
      </p>
    </div>
  );
};

export default DestinationForecastComponent;
