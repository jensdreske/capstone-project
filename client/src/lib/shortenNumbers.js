export default function shortenNumbers(value, places = 7) {
  if (value.toString().length > places) {
    return value.toExponential(places - 3);
  }
  return value;
}
