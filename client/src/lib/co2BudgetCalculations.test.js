import { calculateGameEnd } from "./co2BudgetCalculations";

const playerScore = {
  individualCo2Emissions: 10.4649,
};

const countryData = {
  population: 83190556,
  emissions: 1014360,
  emissionsUnfcc: {
    emission: 858368,
  },
};

test("calculate the year Germany should reach carbon neutrality, with linear reduction on from 2020 to limit global warming below 1.75°C, should be 2038", () => {
  expect(
    Math.floor(calculateGameEnd(playerScore, countryData, "1.75 degree"))
  ).toBe(2038);
});

test("calculate the year Germany should reach carbon neutrality, with linear reduction on from 2020 to limit global warming below 1.5°C, should be 2031", () => {
  expect(
    Math.floor(calculateGameEnd(playerScore, countryData, "1.5 degree"))
  ).toBe(2031);
});

test("calculate for 1.75°C limit with half the emissions, should give twice the time: 2056 ", () => {
  expect(
    Math.floor(
      calculateGameEnd(
        { ...playerScore, individualCo2Emissions: 10.4649 / 2 },
        countryData,
        "1.75 degree"
      )
    )
  ).toBe(2056);
});

test("calculate for 1.5°C limit with half the emissions, should give twice the time: 2042", () => {
  expect(
    Math.floor(
      calculateGameEnd(
        { ...playerScore, individualCo2Emissions: 10.4649 / 2 },
        countryData,
        "1.5 degree"
      )
    )
  ).toBe(2042);
});

test("calculate for 1.75°C limit with half the emissions, should give half the time: 2029 ", () => {
  expect(
    Math.floor(
      calculateGameEnd(
        { ...playerScore, individualCo2Emissions: 10.4649 * 2 },
        countryData,
        "1.75 degree"
      )
    )
  ).toBe(2029);
});

test("calculate for 1.5°C limit with half the emissions, should give half the time: 2025", () => {
  expect(
    Math.floor(
      calculateGameEnd(
        { ...playerScore, individualCo2Emissions: 10.4649 * 2 },
        countryData,
        "1.5 degree"
      )
    )
  ).toBe(2025);
});
