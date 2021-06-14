export function roundPlaces(float, places) {
  const power = Math.pow(10, places);
  return Math.round(float * power) / power;
}
