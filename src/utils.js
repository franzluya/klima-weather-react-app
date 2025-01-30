export async function getCoordinates(location) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${location}&format=jsonv2`)
  const data = await response.json()
  return data;
}