import { useEffect, useState } from "react";
import styled from "styled-components/macro";

import { roundPlaces } from "../lib/roundPlaces";
import { conversions } from "../lib/variables";
import { player as playerInit } from "../lib/variables";

import {
  vehicleCo2PerYear,
  recalculateTransportationScore,
} from "../lib/transportationScoreCalculations";

const playerTransport = JSON.stringify(playerInit.transport);

export default function Transportation({ player, setPlayer, countryData }) {
  const fieldEntryInits = {
    car: {},
    bus: {},
    train: {},
    aviation_exterior: {},
    aviation_interior: {},
  };

  const [fieldEntry, setFieldEntry] = useState({ ...fieldEntryInits });

  useEffect(() => {
    recalculateIndividualScore();
  }, [fieldEntry]);

  function resetForm() {
    setFieldEntry({ ...fieldEntryInits });

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
        player.individualCo2Emissions = recalculateTransportationScore(
          player,
          countryData
        );
        return { ...player };
      });
    }
  }

  function recalculateIndividualScore() {
    setPlayer({
      ...player,
      individualCo2Emissions: recalculateTransportationScore(
        player,
        countryData
      ),
    });
  }

  return (
    <Shareform>
      <h3>Transportation</h3>
      <p>choose your car</p>
      <TransportationForm>
        <p>fuel consumption</p>
        <FormInput
          type="text"
          id="consumption"
          name="consumption"
          value={`${
            fieldEntry.car.consumption ?? player.transport.car.consumption
          }`}
          onChange={(event) => updatePlayer(event, "car")}
        ></FormInput>
        <p>distance per year</p>
        <FormInput
          type="text"
          id="kmPerYear"
          name="kmPerYear"
          value={roundPlaces(player.transport.car.kmPerYear)}
          onChange={(event) => updatePlayer(event, "car")}
        ></FormInput>
        <p>Person per Car</p>
        <FormInput
          type="text"
          id="utilization"
          name="utilization"
          value={`${
            fieldEntry.car.utilization ?? player.transport.car.utilization
          }`}
          onChange={(event) => updatePlayer(event, "car")}
        ></FormInput>
        <p>CO2 emissions per year</p>
        <ResultBox>
          {roundPlaces(vehicleCo2PerYear("car", player, countryData))}
        </ResultBox>
      </TransportationForm>

      <p>Public Transportation</p>
      <p className="smallText">distance per year</p>
      <TransportationForm>
        <p>Bus</p>
        <FormInput
          type="text"
          id="BusKmPerYear"
          name="kmPerYear"
          value={roundPlaces(player.transport.bus.kmPerYear)}
          onChange={(event) => updatePlayer(event, "bus")}
        ></FormInput>

        <p>Train</p>
        <FormInput
          type="text"
          id="TrainKmPerYear"
          name="kmPerYear"
          value={roundPlaces(player.transport.train.kmPerYear)}
          onChange={(event) => updatePlayer(event, "train")}
        ></FormInput>

        <p>Plane</p>
        <FormInput
          type="text"
          id="PlaneKmPerYear"
          name="kmPerYear"
          value={roundPlaces(player.transport.aviation_exterior.kmPerYear)}
          onChange={(event) => updatePlayer(event, "aviation_exterior")}
        ></FormInput>

        <p>domestic flights</p>
        <FormInput
          type="text"
          id="PlaneKmPerYear"
          name="kmPerYear"
          value={roundPlaces(player.transport.aviation_interior.kmPerYear)}
          onChange={(event) => updatePlayer(event, "aviation_interior")}
        ></FormInput>
        <p>CO2 emissions per year</p>
        <ResultBox>
          {roundPlaces(
            ["bus", "train", "aviation_exterior", "aviation_interior"]
              .map((vehicle) => vehicleCo2PerYear(vehicle, player, countryData))
              .reduce((acc, cur) => acc + cur)
          )}
        </ResultBox>
      </TransportationForm>
      <button onClick={() => resetForm()}>reset to German Average</button>
    </Shareform>
  );
}

const Shareform = styled.article`
  backdrop-filter: blur(3px);
  background-color: hsla(200, 100%, 94.7%, 0.79);
  border-radius: 6px;
  border: 2px solid black;
  margin-bottom: 1rem;
  padding: 0.5rem;
  position: relative;
  z-index: 50;
  button {
    background: white;
    border-radius: 6px;
    border: 1.5px solid black;
    padding: 0.25rem 1rem;
  }
`;

const TransportationForm = styled.section`
  align-items: center;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 3fr 1fr;
  margin: 1rem;
  text-align: right;
`;

const FormInput = styled.input`
  font-size: 1rem;
  padding: 0.25rem 1rem;
  width: 8rem;
`;

const ResultBox = styled.p`
  border-radius: 6px;
  border: 2px solid black;
  padding: 0.25rem 1rem;
  text-align: left;
`;
