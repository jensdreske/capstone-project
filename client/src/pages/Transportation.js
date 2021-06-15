import { roundPlaces } from "../lib/roundPlaces";
import { conversions, countryData, player } from "../variables";

import { CarbonApiCheck } from "../components/carbonApiCheck";

export default function Transportation({ player, setPlayer }) {
  function updatePlayer(event) {
    const fieldName = event.target.name;
    let fieldValue = event.target.value;
    fieldValue = Number(fieldValue);
    if (!isNaN(fieldValue)) {
      setPlayer((player) => {
        player.transport.car[fieldName] = fieldValue;
        if (fieldName === "consumption")
          player.transport.car.co2Per100km =
            fieldValue * conversions.gasolineToCO2;
        player.individualCo2Emissions = recalculateScore();
        return { ...player };
      });
    }
  }

  function recalculateScore() {
    const result =
      player.averageCo2Emissions +
      (player.averageCo2Emissions + (carCo2PerYear() - carCo2Average())) / 1000;
    console.log(result);
    return result;
  }

  function carCo2PerYear() {
    return (
      (player.transport.car.kmPerYear * player.transport.car.co2Per100km) / 100
    );
  }

  function carkmPerYearAverage() {
    return countryData.personKm.car / countryData.population;
  }

  function carCo2Average() {
    return carkmPerYearAverage() * carCo2Per100kmAverage();
  }

  function carCo2Per100kmAverage() {
    return (countryData.car.consumption / 100) * conversions.gasolineToCO2;
  }

  return (
    <>
      <p>Transportation</p>
      <hr />
      <p> choose Car </p>
      <p>{roundPlaces(player.transport.car.consumption)} l/100km</p>
      <input
        type="text"
        id="consumption"
        name="consumption"
        value={`${player.transport.car.consumption}`}
        onChange={updatePlayer}
      ></input>
      <p>fahrleistung pro Jahr</p>
      <p>{roundPlaces(player.transport.car.kmPerYear)} km</p>
      <input
        type="text"
        id="kmPerYear"
        name="kmPerYear"
        value={roundPlaces(player.transport.car.kmPerYear)}
        onChange={updatePlayer}
      ></input>
      <hr />
      <p>
        car:
        {roundPlaces(carCo2PerYear())} kg CO2 / Jahr
      </p>
      <hr />
      <hr />
      <p>Car: {roundPlaces(player.transport.car.kmPerYear)} km/year</p>
      <p>car average: {roundPlaces(carkmPerYearAverage())}</p>
      <p>car co2 average: {roundPlaces(carCo2Average())} </p>
      <p>Bus: {roundPlaces(player.transport.bus.kmPerYear)} km/year</p>
      <p>Train: {roundPlaces(player.transport.train.kmPerYear)} km/year</p>
      <p>
        Flugzeug: {roundPlaces(player.transport.aviation_sum.kmPerYear)} km/year
      </p>
      <p>
        davon Inlands-Flüge:{" "}
        {roundPlaces(player.transport.aviation_interior.kmPerYear)} km/year
      </p>
    </>
  );
}
