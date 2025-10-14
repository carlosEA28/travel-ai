import TripItensComponent from "./trip-itens";

type ItineraryTabsProps = {
  tripId: string;
};

export default function ItineraryTabs({ tripId }: ItineraryTabsProps) {
  return (
    <div className="flex flex-col items-center   w-full max-w-3xl mx-auto p-6">
      <TripItensComponent tripId={tripId} />
    </div>
  );
}
