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
    <CustomGoalsWrapper>
      {communityGoals.length ? <h4>Community Goals</h4> : null}

      {communityGoals.map((goal) => {
        return (
          <ListItemBox key={goal._id} data-test-id="community-goals">
            <section>
              <CustomGoalTitle>{goal.name}</CustomGoalTitle>
              <CustomGoalEmissions>
                {goal.co2InKgPerUnit} kg CO2
              </CustomGoalEmissions>
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
                remove goal
              </RemoveButton>
            </section>
            <ButtonBox>
              <CheckBox
                onClick={() => {
                  toggleEmissionsFromCommunityGoals(
                    goal,

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
    </CustomGoalsWrapper>
  );
}

const CustomGoalsWrapper = styled.article`
  margin: 1.5rem 0;
`;

const ListItemBox = styled.section`
  align-items: center;
  background: var(--backgroundBright);
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

const CustomGoalTitle = styled.p`
  font-weight: 500;
  font-size: 1.25rem;
`;

const CustomGoalEmissions = styled.p`
  font-size: var(--smallText);
`;

const CustomGoalDescription = styled.p`
  font-size: var(--smallText);
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

const RemoveButton = styled.button`
  display: ${(props) => (props.hidden ? "none" : "block")};
  padding: 0.125rem 0.5rem;
  font-weight: 600;
  background: #f008;
  border: var(--borderLine);
  border-radius: var(--boxRadius);
  color: var(--brightest);
  font-size: var(--smallText);
  margin-top: 1rem;
`;

const CheckBox = styled.button`
  height: 2.5rem;
  width: 2.5rem;
  border: var(--borderLine);
  border-radius: var(--boxRadius);
  background-color: var(--backgroundBright);
  flex: none;
`;
