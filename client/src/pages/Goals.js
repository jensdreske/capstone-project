import { useEffect, useState } from "react";
import styled from "styled-components/macro";

import yucatan from "../images/travels/mexico-1032966_2.jpeg";
import cruiseShip from "../images/travels/ferry-boat-123059.jpeg";
import mallorca from "../images/travels/summer-2519545.jpeg";
import balticseaImage from "../images/travels/house-4028391.jpeg";

import checkmark from "../images/checkmark@2x.png";
import close from "../images/close@2x.png";

import { goals } from "../lib/variables";

const travelImages = {
  mexico: yucatan,
  mallorca: mallorca,
  cruiseShip: cruiseShip,
  balticSea: balticseaImage,
};

function GoalTravelItem({
  goals,
  destination,
  checkedGoals,
  setCheckedGoals,
  addEmissionsFromGoals,
}) {
  function toggleDestination(destination) {
    if (!checkedGoals.includes(destination)) {
      setCheckedGoals([...checkedGoals, destination]);
    } else {
      const oneGoalLess = checkedGoals.filter((goal) => goal !== destination);
      setCheckedGoals(oneGoalLess);
    }
  }

  return (
    <ListItemBox>
      <TravelIcon
        src={travelImages[destination]}
        alt=""
        height="50"
        width="75"
      />
      <TravelText>
        <TravelTextTitle>{goals.tourism[destination].location}</TravelTextTitle>
        <p className="smalltext">{goals.tourism[destination].region}</p>
      </TravelText>
      <CheckBox
        onClick={() => {
          toggleDestination(destination);
          addEmissionsFromGoals(destination);
        }}
      >
        {checkedGoals.includes(destination) && (
          <img src={checkmark} alt="check" heigth="30" width="30" />
        )}
      </CheckBox>
    </ListItemBox>
  );
}

export default function Goals({
  playerScore,
  setPlayerScore,
  emissionsFromGoals,
  setEmissionsFromGoals,
  checkedGoals,
  setCheckedGoals,
}) {
  useEffect(() => updatePlayerGoal(emissionsFromGoals), [checkedGoals]);

  function addEmissionsFromGoals(destination) {
    let newList = {};
    if (Object.keys(emissionsFromGoals).includes(destination)) {
      delete emissionsFromGoals[destination];
      newList = {
        ...emissionsFromGoals,
      };
    } else {
      newList = {
        ...emissionsFromGoals,
        [destination]: goals.tourism[destination].emissionsPerPerson,
      };
      setEmissionsFromGoals(newList);
    }
  }

  function updatePlayerGoal(emissionsFromGoals) {
    const output = Object.keys(emissionsFromGoals)
      .map((goalKey) => emissionsFromGoals[goalKey])
      .reduce((acc, cur) => acc + cur, 0);
    setPlayerScore((playerScore) => {
      playerScore.goal.emissions = output;
      return { ...playerScore };
    });
  }

  return (
    <GoalContainer>
      <h2>Set your Goals!</h2>
      <h3>Travels</h3>
      <GoalTravelItem
        goals={goals}
        destination="balticSea"
        checkedGoals={checkedGoals}
        setCheckedGoals={setCheckedGoals}
        addEmissionsFromGoals={addEmissionsFromGoals}
      />
      <GoalTravelItem
        goals={goals}
        destination="mallorca"
        checkedGoals={checkedGoals}
        setCheckedGoals={setCheckedGoals}
        addEmissionsFromGoals={addEmissionsFromGoals}
      />
      <GoalTravelItem
        goals={goals}
        destination="cruiseShip"
        checkedGoals={checkedGoals}
        setCheckedGoals={setCheckedGoals}
        addEmissionsFromGoals={addEmissionsFromGoals}
      />
      <GoalTravelItem
        goals={goals}
        destination="mexico"
        checkedGoals={checkedGoals}
        setCheckedGoals={setCheckedGoals}
        addEmissionsFromGoals={addEmissionsFromGoals}
      />
    </GoalContainer>
  );
}

const GoalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: var(--borderLine);
  border-radius: var(--boxRadius);
  background: hsla(200, 100%, 90%, 0.5);
  padding: 0.5rem;
`;

const ListItemBox = styled.section`
  border: var(--borderLine);
  border-radius: var(--boxRadius);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem;
  background: #fffa;
  max-width: 30rem;
  width: 100%;
  margin: 0.25rem 0;
`;

const TravelIcon = styled.img`
  border-radius: 5px;
`;

const TravelText = styled.section`
  flex-grow: 1;
  text-align: left;
  padding-left: 0.5rem;
`;

const TravelTextTitle = styled.h3`
  font-weight: 600;
  margin: 0;
`;

const CheckBox = styled.button`
  height: 2.5rem;
  width: 2.5rem;
  border: var(--borderLine);
  border-radius: var(--boxRadius);
  margin-right: 0.25rem;
`;
