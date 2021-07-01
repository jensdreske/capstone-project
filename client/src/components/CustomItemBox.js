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

function postCustomGoalToCommunity(customGoal) {
  const communityGoal = {
    name: customGoal.goalName,
    co2InKgPerUnit: customGoal.goalCo2Emission,
    description: customGoal.goalDescription,
  };
  fetch("/customGoals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(communityGoal),
  })
    .then((result) => result.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error.message));
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
            <CustomGoalWrapper>
              <section>
                <CustomGoalTitle data-test-id="custom-goal-title">
                  {goals.customGoals[goalKey].goalName}
                </CustomGoalTitle>
                <CustomGoalDescription>
                  {goals.customGoals[goalKey].goalCo2Emission} kg CO2
                </CustomGoalDescription>
                <CustomGoalDescription>
                  {goals.customGoals[goalKey].goalDescription}
                </CustomGoalDescription>
              </section>

              <CheckBox
                onClick={() => {
                  toggleEmissionsFromCustomGoals(
                    goalKey,
                    goals,
                    emissionsFromGoals,
                    setEmissionsFromGoals
                  );
                }}
                data-test-id="custom-goal-checkbox"
              >
                {Object.keys(emissionsFromGoals).includes(goalKey) && (
                  <img src={checkmark} alt="check" heigth="30" width="30" />
                )}
              </CheckBox>
            </CustomGoalWrapper>
            <ButtonBox>
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
                data-test-id="custom-goal-remove-button"
              >
                remove goal
              </RemoveButton>
              <UploadButton
                onClick={() => {
                  postCustomGoalToCommunity(goals.customGoals[goalKey]);
                  delete goals.customGoals[goalKey];
                  setGoals({ ...goals });
                  setEmissionsFromGoals({
                    ...emissionsFromGoals,
                  });
                }}
              >
                add to Community Goals
              </UploadButton>
            </ButtonBox>
          </ListItemBox>
        );
      })}
    </>
  );
}

const ListItemBox = styled.section`
  background: var(--backgroundBright);
  border-radius: var(--boxRadius);
  border: var(--borderLine);
  margin: 0.25rem 0;
  max-width: 30rem;
  padding: 0.5rem;
  text-align: left;
  width: 100%;
`;

const CustomGoalWrapper = styled.article`
  display: flex;
  justify-content: space-between;
`;

const CustomGoalTitle = styled.h3`
  font-weight: 500;
`;

const CustomGoalDescription = styled.p`
  font-size: var(--smallText);
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const RemoveButton = styled.button`
  padding: 0.125rem 0.5rem;
  font-size: var(--smallText);
  font-weight: 600;
  background: #f008;
  border: var(--borderLine);
  border-radius: var(--boxRadius);
  color: var(--brightest);
`;

const UploadButton = styled.button`
  background-color: hsla(150, 65%, 40%, 0.8);
  border-radius: var(--boxRadius);
  border: var(--borderLine);
  color: var(--brightest);
  font-size: var(--smallText);
  font-weight: 600;
  padding: 0.125rem 0.5rem;
`;

const CheckBox = styled.button`
  background-color: var(--backgroundBright);
  border-radius: var(--boxRadius);
  border: var(--borderLine);
  flex: none;
  height: 2.5rem;
  width: 2.5rem;
`;
