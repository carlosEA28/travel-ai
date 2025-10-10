import {
  Map,
  MapMarker,
  MapPopup,
  MapTileLayer,
  MapZoomControl,
} from "@/components/ui/map";

const MapComponent = () => {
  return (
    <Map center={[43.60482759573559, 1.411316557139571]} className="">
      <MapTileLayer />
      <MapZoomControl />
      <MapMarker position={[43.60482759573559, 1.411316557139571]}>
        <MapPopup>A map component for shadcn/ui.</MapPopup>
      </MapMarker>
    </Map>
  );
};

export default MapComponent;
