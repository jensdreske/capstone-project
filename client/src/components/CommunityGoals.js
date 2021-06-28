import { useEffect } from "react";
import styled from "styled-components/macro";

import checkmark from "../images/checkmark@2x.png";

function toggleEmissionsFromCommunityGoals(
  goal,
  emissionsFromGoals,
  setEmissionsFromGoals
) {
  const goalName = goal.name.replaceAll(" ", "_");
  if (Object.keys(emissionsFromGoals).includes(goalName)) {
    delete emissionsFromGoals[goalName];
    setEmissionsFromGoals({
      ...emissionsFromGoals,
    });
  } else {
    const co2EmissionValue = parseFloat(goal.co2InKgPerUnit);
    setEmissionsFromGoals({
      ...emissionsFromGoals,
      [goalName]: co2EmissionValue,
    });
  }
}

function removeFromCommunityGoals(
  goal,
  emissionsFromGoals,
  setEmissionsFromGoals
) {
  delete emissionsFromGoals[goal.name.replaceAll(" ", "_")];
  setEmissionsFromGoals({
    ...emissionsFromGoals,
  });
  fetch("/customgoals/" + goal._id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((result) => result.json())
    .then((response) => {
      console.log(response);
    });
}

export default function CommunityGoals({
  communityGoals,
  setCommunityGoals,
  emissionsFromGoals,
  setEmissionsFromGoals,
  goals,
}) {
  useEffect(() => {
    fetch("/customgoals")
      .then((result) => result.json())
      .then((goalsFromApi) => setCommunityGoals(goalsFromApi))
      .catch((error) => console.error(error));
  }, [emissionsFromGoals]);

  return (
    <>
      {communityGoals.length ? <h3>Community Goals</h3> : null}

      {communityGoals.map((goal) => {
        return (
          <ListItemBox key={goal._id}>
            <section>
              <CustomGoalTitle>{goal.name}</CustomGoalTitle>
              <CustomGoalDescription>
                {goal.co2InKgPerUnit} kg CO2
              </CustomGoalDescription>
              <CustomGoalDescription>{goal.description}</CustomGoalDescription>
              <RemoveButton
                hidden={goal.verified}
                onClick={() => {
                  removeFromCommunityGoals(
                    goal,
                    emissionsFromGoals,
                    setEmissionsFromGoals
                  );
                }}
              >
                remove from Database
              </RemoveButton>
            </section>
            <ButtonBox>
              <CheckBox
                onClick={() => {
                  toggleEmissionsFromCommunityGoals(
                    goal,
                    goals,
                    emissionsFromGoals,
                    setEmissionsFromGoals
                  );
                }}
              >
                {Object.keys(emissionsFromGoals).includes(
                  goal.name.replaceAll(" ", "_")
                ) && <img src={checkmark} alt="check" height="30" width="30" />}
              </CheckBox>
            </ButtonBox>
          </ListItemBox>
        );
      })}
    </>
  );
}

const ListItemBox = styled.section`
  align-items: center;
  background: #fffa;
  border-radius: var(--boxRadius);
  border: var(--borderLine);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0.25rem 0;
  max-width: 30rem;
  padding: 0.5rem;
  width: 100%;
  text-align: left;
`;

const CustomGoalTitle = styled.h3`
  font-weight: 600;
  margin: 0;
`;

const CustomGoalDescription = styled.p`
  font-size: 0.8rem;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

const RemoveButton = styled.button`
  display: ${(props) => (props.hidden ? "none" : "block")};
  padding: 0 0.5rem;
  font-weight: 500;
  background: #f008;
  border: var(--borderLine);
  border-radius: var(--boxRadius);
  color: #fffd;
  font-size: 0.6rem;
`;

const CheckBox = styled.button`
  height: 2.5rem;
  width: 2.5rem;
  border: var(--borderLine);
  border-radius: var(--boxRadius);
  flex: none;
`;
