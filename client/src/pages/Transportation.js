import { useEffect, useState } from "react";
import styled from "styled-components/macro";

import { roundPlaces } from "../lib/roundPlaces";
import { conversions, countryData } from "../lib/variables";
import { player } from "../lib/variables";

import { CarbonApiCheck } from "../components/carbonApiCheck";

const playerTransport = JSON.stringify(player.transport);
// const playerInit = Object.assign({}, player.transport);

export default function Transportation({ player, setPlayer }) {
  const [fieldEntry, setFieldEntry] = useState({
    car: {},
    bus: {},
    train: {},
    aviation_exterior: {},
    aviation_interior: {},
  });

  useEffect(() => {
    recalculateIndividualScore();
  }, [fieldEntry]);

  function resetForm() {
    setFieldEntry({
      car: {},
      train: {},
      bus: {},
      aviation_exterior: {},
      aviation_interior: {},
    });

    setPlayer({
      ...player,
      transport: { ...JSON.parse(playerTransport) },
    });
  }

  function updatePlayer(event, category) {
    const fieldName = event.target.name;
    let fieldValue = event.target.value;
    setFieldEntry((fieldEntry) => {
      fieldEntry[category][fieldName] = fieldValue;
      return fieldEntry;
    });
    fieldValue = Number(fieldValue);
    if (!isNaN(fieldValue)) {
      setPlayer((player) => {
        player.transport[category][fieldName] = fieldValue;
        if (category === "car") {
          if (fieldName === "consumption") {
            player.transport.car.co2Per100km =
              fieldValue * conversions.gasolineToCO2;
          }
          if (fieldName === "utilization") {
            player.transport.car.utilization = Math.max(1, fieldValue);
          }
        }
        player.individualCo2Emissions = recalculateScore();
        return { ...player };
      });
    }
  }

  function recalculateIndividualScore() {
    setPlayer({ ...player, individualCo2Emissions: recalculateScore() });
  }

  function recalculateScore() {
    const difference =
      co2PerYear("car") -
      co2PerYearAverage("car") +
      (co2PerYear("bus") - co2PerYearAverage("bus")) +
      (co2PerYear("train") - co2PerYearAverage("train")) +
      (co2PerYear("aviation_exterior") -
        co2PerYearAverage("aviation_exterior")) +
      (co2PerYear("aviation_interior") -
        co2PerYearAverage("aviation_interior"));
    return player.averageCo2Emissions + difference / 1000;
  }

  function co2PerYear(vehicle) {
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

  function co2PerYearAverage(vehicle) {
    if (vehicle === "car")
      return (
        (kmPerYearAverage("car") * co2Per100kmAverage("gasoline")) /
        countryData.transport.car.utilization
      );
    return (
      (kmPerYearAverage(vehicle) * countryData.transport[vehicle].co2Per100km) /
      100
    );
  }

  function kmPerYearAverage(vehicle) {
    return countryData.personKm[vehicle] / countryData.population;
  }

  function co2Per100kmAverage(fuel) {
    if (fuel === "gasoline") {
      return (
        (countryData.transport.car.consumption / 100) *
        conversions.gasolineToCO2
      );
    }
  }

  return (
    <Shareform>
      <h3>Transportation</h3>
      <p>choose your car</p>
      <TransportationForm>
        <p className="fieldDescription">fuel consumption</p>
        <input
          type="text"
          id="consumption"
          name="consumption"
          value={`${
            fieldEntry.car.consumption ?? player.transport.car.consumption
          }`}
          onChange={(event) => updatePlayer(event, "car")}
        ></input>
        <p className="fieldDescription">distance per year</p>
        <input
          type="text"
          id="kmPerYear"
          name="kmPerYear"
          value={roundPlaces(player.transport.car.kmPerYear)}
          onChange={(event) => updatePlayer(event, "car")}
        ></input>
        <p>Person per Car</p>
        <input
          type="text"
          id="utilization"
          name="utilization"
          value={`${
            fieldEntry.car.utilization ?? player.transport.car.utilization
          }`}
          onChange={(event) => updatePlayer(event, "car")}
        ></input>
        <p className="fieldDescription">CO2 emissions per year</p>
        <ResultBox>{roundPlaces(co2PerYear("car"))}</ResultBox>
      </TransportationForm>

      <p>Public Transportation</p>
      <p className="smallText">distance per year</p>
      <TransportationForm>
        <p className="fieldDescription">Bus</p>
        <input
          type="text"
          id="BusKmPerYear"
          name="kmPerYear"
          value={roundPlaces(player.transport.bus.kmPerYear)}
          onChange={(event) => updatePlayer(event, "bus")}
        ></input>

        <p className="fieldDescription">Train</p>
        <input
          type="text"
          id="TrainKmPerYear"
          name="kmPerYear"
          value={roundPlaces(player.transport.train.kmPerYear)}
          onChange={(event) => updatePlayer(event, "train")}
        ></input>

        <p className="fieldDescription">Plane</p>
        <input
          type="text"
          id="PlaneKmPerYear"
          name="kmPerYear"
          value={roundPlaces(player.transport.aviation_exterior.kmPerYear)}
          onChange={(event) => updatePlayer(event, "aviation_exterior")}
        ></input>

        <p className="fieldDescription">domestic flights</p>
        <input
          type="text"
          id="PlaneKmPerYear"
          name="kmPerYear"
          value={roundPlaces(player.transport.aviation_interior.kmPerYear)}
          onChange={(event) => updatePlayer(event, "aviation_interior")}
        ></input>
        <p className="fieldDescription">CO2 emissions per year</p>
        <ResultBox>
          {roundPlaces(
            ["bus", "train", "aviation_exterior", "aviation_interior"]
              .map((vehicle) => co2PerYear(vehicle))
              .reduce((acc, cur) => acc + cur)
          )}
        </ResultBox>
      </TransportationForm>
      <button onClick={() => resetForm()}>reset to German Average</button>
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
  button {
    padding: 0.25rem 1rem;
    background: white;
    border-radius: 6px;
    border: 1.5px solid black;
  }
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
