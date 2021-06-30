import scaleValue from "./scaleValue";

test("scale -12.5 with input range -25 to +25 to output range 0 to 120", () => {
  expect(scaleValue(-10, -25, 25, 0, 120)).toBe(30);
});
