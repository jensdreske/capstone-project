import { useEffect, useState } from "react";
import styled from "styled-components/macro";

import { roundPlaces } from "../lib/roundPlaces";
import { conversions } from "../lib/variables";
import { player as playerInit } from "../lib/variables";

import {
  vehicleCo2PerYear,
  recalculateTransportationScore,
} from "../lib/transportationScoreCalculations";

import shortenNumbers from "../lib/shortenNumbers";

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

  useEffect(() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" }), []);
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
    if (isFinite(fieldValue)) {
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
      <FormContainer>
        <h4>Private Transport</h4>
        <p className="smallText">Do you use a car?</p>
        <TransportationForm>
          <p>fuel consumption</p>
          <FormWithUnit>
            <FormInput
              type="text"
              id="consumption"
              name="consumption"
              value={`${
                fieldEntry.car.consumption ?? player.transport.car.consumption
              }`}
              onChange={(event) => updatePlayer(event, "car")}
              onFocus={(event) => event.target.select()}
            ></FormInput>
            <Unit>l/100km</Unit>
          </FormWithUnit>
          <p>distance per year</p>
          <FormWithUnit>
            <FormInput
              type="text"
              id="kmPerYear"
              name="kmPerYear"
              value={roundPlaces(player.transport.car.kmPerYear)}
              onChange={(event) => updatePlayer(event, "car")}
              onFocus={(event) => event.target.select()}
            ></FormInput>
            <Unit>km</Unit>
          </FormWithUnit>
          <p>people per car</p>
          <FormWithUnit>
            <Unit>ø</Unit>
            <FormInput
              type="text"
              id="utilization"
              name="utilization"
              value={`${
                fieldEntry.car.utilization ?? player.transport.car.utilization
              }`}
              onChange={(event) => updatePlayer(event, "car")}
              onFocus={(event) => event.target.select()}
            ></FormInput>
          </FormWithUnit>
          <p>CO2 per year</p>
          <ResultBox>
            {shortenNumbers(
              roundPlaces(vehicleCo2PerYear("car", player, countryData))
            )}
            <Unit>kg</Unit>
          </ResultBox>
        </TransportationForm>
      </FormContainer>
      <FormContainer>
        <h4>Public Transportation</h4>
        <p className="smallText">distance per year</p>
        <TransportationForm>
          <p>Bus</p>
          <FormWithUnit>
            <Unit>km</Unit>
            <FormInput
              type="text"
              id="BusKmPerYear"
              name="kmPerYear"
              value={roundPlaces(player.transport.bus.kmPerYear)}
              onChange={(event) => updatePlayer(event, "bus")}
              onFocus={(event) => event.target.select()}
            ></FormInput>
          </FormWithUnit>
          <p>Train</p>
          <FormWithUnit>
            <Unit>km</Unit>
            <FormInput
              type="text"
              id="TrainKmPerYear"
              name="kmPerYear"
              value={roundPlaces(player.transport.train.kmPerYear)}
              onChange={(event) => updatePlayer(event, "train")}
              onFocus={(event) => event.target.select()}
            ></FormInput>
          </FormWithUnit>

          <p>Plane</p>
          <FormWithUnit>
            <Unit>km</Unit>
            <FormInput
              type="text"
              id="PlaneKmPerYear"
              name="kmPerYear"
              value={roundPlaces(player.transport.aviation_exterior.kmPerYear)}
              onChange={(event) => updatePlayer(event, "aviation_exterior")}
              onFocus={(event) => event.target.select()}
            ></FormInput>
          </FormWithUnit>

          <p>domestic flights</p>
          <FormWithUnit>
            <Unit>km</Unit>
            <FormInput
              type="text"
              id="PlaneKmPerYear"
              name="kmPerYear"
              value={roundPlaces(player.transport.aviation_interior.kmPerYear)}
              onChange={(event) => updatePlayer(event, "aviation_interior")}
              onFocus={(event) => event.target.select()}
            ></FormInput>
          </FormWithUnit>
          <p>CO2 per year</p>
          <ResultBox>
            <Unit>kg</Unit>
            {shortenNumbers(
              roundPlaces(
                ["bus", "train", "aviation_exterior", "aviation_interior"]
                  .map((vehicle) =>
                    vehicleCo2PerYear(vehicle, player, countryData)
                  )
                  .reduce((acc, cur) => acc + cur)
              )
            )}
          </ResultBox>
        </TransportationForm>
      </FormContainer>
      <ResetButton onClick={() => resetForm()}>
        reset to German Average
      </ResetButton>
    </Shareform>
  );
}

const Shareform = styled.article`
  align-items: center;
  backdrop-filter: var(--boxBackdropFilter);
  background-color: var(--backgroundTransparent);
  border-radius: var(--boxRadius);
  border: var(--borderLine);
  display: flex;
  flex-direction: column;
  margin-bottom: 6rem;
  max-width: 550px;
  padding: 0.5rem;
  position: relative;
  width: 100%;
  z-index: 50;
`;

const FormContainer = styled.article`
  background-color: var(--backgroundBright);
  border-radius: var(--boxRadius);
  border: var(--borderLine);
  margin: 1rem 0;
  padding: 1rem 0.5rem;
  max-width: 30rem;
`;

const TransportationForm = styled.section`
  align-items: center;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 3fr 1fr;
  margin-top: 1rem;
  text-align: right;
`;

const FormWithUnit = styled.div`
  align-items: center;
  background: var(--backgroundBright);
  border-radius: var(--boxRadius);
  border: var(--borderLine);
  display: flex;
  padding: 3px;
  position: relative;
  width: 8rem;
`;

const FormInput = styled.input`
  background: none;
  border: none;
  font-size: 1rem;
  max-width: 100%;
  padding: 0.125rem 0.25rem;
  text-align: right;
`;

const Unit = styled.div`
  color: #0055;
  display: inline;
  flex: none;
  left: 0.25rem;
  margin-left: 0.25rem;
  position: absolute;
  pointer-events: none;
`;

const ResetButton = styled.button`
  background-color: hsla(0, 75%, 50%, 0.8);
  border-radius: var(--boxRadius);
  border: var(--borderLine);
  color: var(--brightest);
  font-size: var(--smallText);
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  width: 100%;
`;

const ResultBox = styled.div`
  border-radius: var(--boxRadius);
  border: var(--borderLine);
  padding: 0.25rem 0.5rem;
  position: relative;
  text-align: right;
`;
