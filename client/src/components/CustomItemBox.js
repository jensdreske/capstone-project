import { useEffect } from "react";
import styled from "styled-components/macro";

import checkmark from "../images/checkmark@2x.png";

function toggleEmissionsFromCustomGoals(
  customGoal,
  goals,
  emissionsFromGoals,
  setEmissionsFromGoals
) {
  if (Object.keys(emissionsFromGoals).includes(customGoal)) {
    delete emissionsFromGoals[customGoal];
    setEmissionsFromGoals({
      ...emissionsFromGoals,
    });
  } else {
    const co2EmissionValue = parseFloat(
      goals.customGoals[customGoal].goalCo2Emission
    );
    setEmissionsFromGoals({
      ...emissionsFromGoals,
      [customGoal]: co2EmissionValue,
    });
  }
}

function removeCustomGoal(
  customGoal,
  goals,
  setGoals,
  emissionsFromGoals,
  setEmissionsFromGoals
) {
  if (Object.keys(emissionsFromGoals).includes(customGoal)) {
    delete emissionsFromGoals[customGoal];
    setEmissionsFromGoals({
      ...emissionsFromGoals,
    });
  }
  delete goals.customGoals[customGoal];
  setGoals({ ...goals });
}

export default function CustomItemBox({
  goals,
  setGoals,
  emissionsFromGoals,
  setEmissionsFromGoals,
}) {
  return (
    <>
      {Object.keys(goals.customGoals).map((goalKey) => {
        return (
          <ListItemBox key={goalKey}>
            <CustomGoalTextBox>
              <CustomGoalTitle>
                {goals.customGoals[goalKey].goalName}
              </CustomGoalTitle>
              <CustomGoalDescription>
                {goals.customGoals[goalKey].goalCo2Emission} kg CO2
              </CustomGoalDescription>
              <CustomGoalDescription>
                {goals.customGoals[goalKey].goalDescription}
              </CustomGoalDescription>
            </CustomGoalTextBox>
            <ButtonBox>
              <CheckBox
                onClick={() => {
                  toggleEmissionsFromCustomGoals(
                    goalKey,
                    goals,
                    emissionsFromGoals,
                    setEmissionsFromGoals
                  );
                }}
              >
                {Object.keys(emissionsFromGoals).includes(goalKey) && (
                  <img src={checkmark} alt="check" heigth="30" width="30" />
                )}
              </CheckBox>
              <RemoveButton
                onClick={() =>
                  removeCustomGoal(
                    goalKey,
                    goals,
                    setGoals,
                    emissionsFromGoals,
                    setEmissionsFromGoals
                  )
                }
              >
                remove
              </RemoveButton>
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

const CustomGoalTextBox = styled.section``;

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
  padding: 0 0.5rem;
  font-weight: 600;
  background: #f008;
  border: var(--borderLine);
  border-radius: var(--boxRadius);
  color: #fffd;
`;

const CheckBox = styled.button`
  height: 2.5rem;
  width: 2.5rem;
  border: var(--borderLine);
  border-radius: var(--boxRadius);

  flex: none;
`;
