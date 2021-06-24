import { conversions } from "./variables";

export function co2Per100kmAverage(fuel, countryData) {
  switch (fuel) {
    case "gasoline":
      return (
        (countryData.transport.car.consumption / 100) *
        conversions.gasolineToCO2
      );
    case "diesel":
      return (
        (countryData.transport.car.consumption / 100) * conversions.dieselToCO2
      );
    default:
      return (
        (countryData.transport.car.consumption / 100) *
        ((conversions.dieselToCo2 + conversions.gasolineToCO2) / 2)
      );
  }
}

export function kmPerYearAverage(vehicle, countryData) {
  return countryData.personKm[vehicle] / countryData.population;
}

export function vehicleCo2PerYearAverage(vehicle, countryData) {
  if (vehicle === "car")
    return (
      (kmPerYearAverage("car", countryData) *
        co2Per100kmAverage("gasoline", countryData)) /
      countryData.transport.car.utilization
    );
  return (
    (kmPerYearAverage(vehicle, countryData) *
      countryData.transport[vehicle].co2Per100km) /
    100
  );
}

export function vehicleCo2PerYear(vehicle, player, countryData) {
  if (vehicle === "car") {
    return (
      (player.transport[vehicle].kmPerYear *
        ((player.transport[vehicle].consumption / 100) *
          conversions.gasolineToCO2)) /
      player.transport[vehicle].utilization
    );
  } else {
    return (
      (player.transport[vehicle].kmPerYear *
        countryData.transport[vehicle].co2Per100km) /
      100
    );
  }
}

export function recalculateTransportationScore(player, countryData) {
  const differenceToAverage =
    vehicleCo2PerYear("car", player, countryData) -
    vehicleCo2PerYearAverage("car", countryData) +
    (vehicleCo2PerYear("bus", player, countryData) -
      vehicleCo2PerYearAverage("bus", countryData)) +
    (vehicleCo2PerYear("train", player, countryData) -
      vehicleCo2PerYearAverage("train", countryData)) +
    (vehicleCo2PerYear("aviation_exterior", player, countryData) -
      vehicleCo2PerYearAverage("aviation_exterior", countryData)) +
    (vehicleCo2PerYear("aviation_interior", player, countryData) -
      vehicleCo2PerYearAverage("aviation_interior", countryData));
  return player.averageCo2Emissions + differenceToAverage / 1000;
}
