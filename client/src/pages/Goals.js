import { useEffect, useState } from "react";
import styled from "styled-components/macro";

import GoalTravelItem from "../components/GoalTravelItem";
import CommunityGoals from "../components/CommunityGoals";
import CustomGoals from "../components/CustomGoals";
import AddCustomGoal from "../components/AddCustomGoal";

import ResultBox from "../components/ResultBox";

export default function Goals({
  playerScore,
  setPlayerScore,
  goals,
  setGoals,
  emissionsFromGoals,
  setEmissionsFromGoals,
  communityGoals,
  setCommunityGoals,
}) {
  const [goalToAdd, setGoalToAdd] = useState({});

  useEffect(() => updatePlayerGoal(emissionsFromGoals), [emissionsFromGoals]);
  useEffect(() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" }), []);

  function addEmissionsFromTourism(destination) {
    if (Object.keys(emissionsFromGoals).includes(destination)) {
      delete emissionsFromGoals[destination];
      setEmissionsFromGoals({
        ...emissionsFromGoals,
      });
    } else {
      setEmissionsFromGoals({
        ...emissionsFromGoals,
        [destination]: goals.tourism[destination].emissionsPerPerson,
      });
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
    <>
      <GoalContainer data-test-id="goal-container">
        <h2>Set your Goals!</h2>
        <GoalSection>
          <h3>Travelling</h3>
          <GoalTravelItem
            goals={goals}
            destination="balticSea"
            emissionsFromGoals={emissionsFromGoals}
            addEmissionsFromTourism={addEmissionsFromTourism}
          />
          <GoalTravelItem
            goals={goals}
            destination="mallorca"
            emissionsFromGoals={emissionsFromGoals}
            addEmissionsFromTourism={addEmissionsFromTourism}
          />
          <GoalTravelItem
            goals={goals}
            destination="cruiseShip"
            emissionsFromGoals={emissionsFromGoals}
            addEmissionsFromTourism={addEmissionsFromTourism}
          />
          <GoalTravelItem
            goals={goals}
            destination="mexico"
            emissionsFromGoals={emissionsFromGoals}
            addEmissionsFromTourism={addEmissionsFromTourism}
          />
        </GoalSection>
        <CommunityGoals
          communityGoals={communityGoals}
          setCommunityGoals={setCommunityGoals}
          emissionsFromGoals={emissionsFromGoals}
          setEmissionsFromGoals={setEmissionsFromGoals}
        />
        <CustomGoals
          goals={goals}
          setGoals={setGoals}
          emissionsFromGoals={emissionsFromGoals}
          setEmissionsFromGoals={setEmissionsFromGoals}
        />
        <AddCustomGoal
          goals={goals}
          setGoals={setGoals}
          goalToAdd={goalToAdd}
          setGoalToAdd={setGoalToAdd}
        />
      </GoalContainer>
    </>
  );
}

const GoalContainer = styled.div`
  align-items: center;
  backdrop-filter: var(--boxBackdropFilter);
  background: var(--backgroundTransparent);
  border-radius: var(--boxRadius);
  border: var(--borderLine);
  display: flex;
  flex-direction: column;
  margin-bottom: 6rem;
  max-width: 550px;
  min-width: 340px;
  padding: 0.5rem;
`;

const GoalSection = styled.div`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
