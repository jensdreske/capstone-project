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
      <ResultBox
        title="Your Goal:"
        result={playerScore.goal.emissions}
        annotation="CO2 Equivalents"
      />
    </>
  );
}

const GoalContainer = styled.div`
  align-items: center;
  background: hsla(200, 100%, 90%, 0.5);
  border-radius: var(--boxRadius);
  border: var(--borderLine);
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  min-width: 340px;
  padding: 0.5rem;
  width: 100%;
  backdrop-filter: blur(5px);
  max-width: 550px;
`;
