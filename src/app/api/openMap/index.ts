// Função utilitária para buscar coordenadas da cidade
export async function getCityCoords(city: string) {
  const res = await fetch(
    `https://api.opentripmap.com/0.1/en/places/geoname?name=${encodeURIComponent(city)}&apikey=${process.env.OPEN_TRIP_MAP_API_KEY}`
  );
  if (!res.ok) throw new Error("Erro ao buscar coordenadas");
  return await res.json();
}

// Função para buscar pontos turísticos próximos
export async function getTopPlaces(lat: number, lon: number) {
  const res = await fetch(
    `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&limit=5&rate=3&apikey=${process.env.OPEN_TRIP_MAP_API_KEY}`
  );
  if (!res.ok) throw new Error("Erro ao buscar pontos turísticos");
  return await res.json();
}
