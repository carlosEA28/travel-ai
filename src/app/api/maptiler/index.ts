const MAPTILER_API_KEY = process.env.MAPTILER_API_KEY!;

export async function geocodeLocation(locationName: string, country: string) {
  const encoded = encodeURIComponent(locationName);
  const url = `https://api.maptiler.com/geocoding/${encoded}.json?key=${MAPTILER_API_KEY}&language=pt&country=${country}`;

  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Erro ao geocodificar ${locationName}:`, res.status);
    return { lat: null, lng: null };
  }

  const data = await res.json();

  if (data.features && data.features.length > 0) {
    const [lng, lat] = data.features[0].geometry.coordinates;
    return { lat, lng };
  }

  return { lat: null, lng: null };
}
