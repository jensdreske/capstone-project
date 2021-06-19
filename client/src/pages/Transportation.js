import { useState } from "react";
import styled from "styled-components/macro";

import { roundPlaces } from "../lib/roundPlaces";
import { conversions, countryData, player } from "../variables";

import { CarbonApiCheck } from "../components/carbonApiCheck";

export default function Transportation({ player, setPlayer }) {
  const [fieldEntry, setFieldEntry] = useState({});

  function updatePlayer(event) {
    const fieldName = event.target.name;
    console.log(fieldName);
    let fieldValue = event.target.value;
    setFieldEntry({ ...fieldEntry, [fieldName]: fieldValue });
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
    // console.log(result);
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
    <Shareform>
      <h3>Transportation</h3>
      <TransportationForm>
        <p>choose your car</p>
        <p className="fieldDescription">fuel consumption</p>
        <input
          type="text"
          id="consumption"
          name="consumption"
          value={`${
            fieldEntry.consumption ?? player.transport.car.consumption
          }`}
          onChange={updatePlayer}
        ></input>
        <p className="fieldDescription">distance per year</p>
        <input
          type="text"
          id="kmPerYear"
          name="kmPerYear"
          value={roundPlaces(player.transport.car.kmPerYear)}
          onChange={updatePlayer}
        ></input>
        <p className="fieldDescription">CO2 emissions per year</p>
        <ResultBox>{roundPlaces(carCo2PerYear())}</ResultBox>
      </TransportationForm>

      <TransportationForm>
        <p>Public Transportation</p>
        <p className="fieldDescription">Bus</p>
        <input
          className="greyedOut"
          type="text"
          id="BusKmPerYear"
          name="BusKmPerYear"
          value={roundPlaces(player.transport.bus.kmPerYear)}
          onChange={updatePlayer}
        ></input>
      </TransportationForm>

      <TransportationForm>
        <p className="fieldDescription">Train</p>
        <input
          className="greyedOut"
          type="text"
          id="TrainKmPerYear"
          name="TrainKmPerYear"
          value={roundPlaces(player.transport.train.kmPerYear)}
          onChange={updatePlayer}
        ></input>
      </TransportationForm>

      <TransportationForm>
        <p className="fieldDescription">Plane</p>
        <input
          className="greyedOut"
          type="text"
          id="PlaneKmPerYear"
          name="PlaneKmPerYear"
          value={roundPlaces(player.transport.aviation_sum.kmPerYear)}
          onChange={updatePlayer}
        ></input>
      </TransportationForm>

      <TransportationForm>
        <p className="fieldDescription">domestic flights</p>
        <input
          className="greyedOut"
          type="text"
          id="PlaneKmPerYear"
          name="PlaneKmPerYear"
          value={roundPlaces(player.transport.aviation_interior.kmPerYear)}
          onChange={updatePlayer}
        ></input>
      </TransportationForm>
    </Shareform>
  );
}

const Shareform = styled.article`
  border: 2px solid black;
  margin: 7rem 1rem 6rem;
  border-radius: 6px;
  padding: 0.5rem;
  background-color: hsla(200, 100%, 94.7%, 0.79);
  z-index: 50;
  position: relative;
  backdrop-filter: blur(3px);
`;

const TransportationForm = styled.section`
  display: grid;
  align-items: center;
  grid-gap: 0.5rem;
  grid-template-columns: 3fr 1fr;
  margin: 1rem;
  text-align: right;
  .fieldDescription {
    grid-column-start: 1;
  }
  input {
    grid-column-start: 2;
    padding: 0.25rem 1rem;
    width: 8rem;
    font-size: 1rem;
  }
  .greyedOut {
    background-color: #fff0;
  }
`;
const ResultBox = styled.p`
  border: 2px solid black;
  border-radius: 6px;
  text-align: left;
  padding: 0.25rem 1rem;
`;
