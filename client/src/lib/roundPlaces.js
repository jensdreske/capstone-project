export function roundPlaces(float, places = 2) {
  const power = Math.pow(10, places);
  return Math.round(float * power) / power;
}
