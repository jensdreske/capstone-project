import { roundPlaces } from "./roundPlaces";

test("round 12.345678 to 12.3", () => {
  expect(roundPlaces(12.345678, 1)).toBe(12.3);
});
