import styled from "styled-components";

function addCustomGoalsToState(event, goalToAdd, goals, setGoals) {
  event.preventDefault();

  const newCustomGoal = { ...goalToAdd };

  if (newCustomGoal.goalName) {
    setGoals({
      ...goals,
      customGoals: {
        ...goals.customGoals,
        [newCustomGoal.goalName.replaceAll(" ", "_")]: newCustomGoal,
      },
    });
  }
}

function updateGoalToAdd(event, goalToAdd, setGoalToAdd) {
  const fieldName = event.target.name;
  const fieldValue = event.target.value;
  setGoalToAdd({ ...goalToAdd, [fieldName]: fieldValue });
}

export default function AddCustomGoal({
  goals,
  setGoals,
  goalToAdd,
  setGoalToAdd,
}) {
  return (
    <AddCustomGoalWrapper>
      <h4>add a custom goal:</h4>
      <AddCustomGoalForm
        onSubmit={(event) => {
          addCustomGoalsToState(event, goalToAdd, goals, setGoals);
          setGoalToAdd({});
        }}
      >
        <FieldLabel htmlFor="goalName">Name</FieldLabel>
        <TextInput
          required
          type="text"
          name="goalName"
          id="goalName"
          data-test-id="goal-name-field"
          onChange={(event) => updateGoalToAdd(event, goalToAdd, setGoalToAdd)}
          value={goalToAdd.goalName ? goalToAdd.goalName : ""}
        ></TextInput>
        <Co2Label htmlFor="goalCo2Emission">CO2 Emission in kg</Co2Label>
        <Co2Input
          required
          type="text"
          name="goalCo2Emission"
          id="goalCo2Emission"
          data-test-id="goal-co2-field"
          onChange={(event) => updateGoalToAdd(event, goalToAdd, setGoalToAdd)}
          value={goalToAdd.goalCo2Emission ? goalToAdd.goalCo2Emission : ""}
        ></Co2Input>
        <FieldLabel htmlFor="goalDescription">Description</FieldLabel>
        <MultilineTextInput
          type="text"
          name="goalDescription"
          id="goalDescription"
          onChange={(event) => updateGoalToAdd(event, goalToAdd, setGoalToAdd)}
          value={goalToAdd.goalDescription ? goalToAdd.goalDescription : ""}
        ></MultilineTextInput>
        <SubmitCustomGoal
          type="submit"
          value="add this goal to the list"
          data-test-id="goal-form-submit"
        />
      </AddCustomGoalForm>
    </AddCustomGoalWrapper>
  );
}

const SubmitCustomGoal = styled.input`
  background-color: hsla(150, 65%, 40%, 0.8);
  border-radius: var(--boxRadius);
  border: var(--borderLine);
  color: var(--brightest);
  font-weight: 600;
  grid-column-end: span 2;
  padding: 0.25rem;
`;

const AddCustomGoalWrapper = styled.div`
  margin-top: 1.5rem;
`;

const AddCustomGoalForm = styled.form`
  align-items: center;
  background: var(--backgroundBright);
  border-radius: var(--boxRadius);
  border: var(--borderLine);
  display: grid;
  font-size: 0.75rem;
  gap: 0.5rem;
  grid-template-columns: auto auto;
  max-width: 30rem;
  padding: 0.5rem;
  text-align: left;
  width: 100%;
`;

const FieldLabel = styled.label`
  grid-column-start: 1;
  align-self: flex-end;
`;

const Co2Label = styled.label`
  grid-column-start: 2;
  grid-row-start: 1;
`;

const Co2Input = styled.input`
  grid-column-start: 2;
  width: 100%;
  padding: 0.5rem;
  background: var(--backgroundBright);
`;

const TextInput = styled.input`
  grid-column-start: 1;
  padding: 0.5rem;
  width: 100%;
  background: var(--backgroundBright);
`;

const MultilineTextInput = styled.textarea`
  grid-column-start: 1;
  grid-column-end: span 2;
  padding: 0.5rem;
  resize: none;
  background: var(--backgroundBright);
  border-radius: var(--boxRadius);
  border: var(--borderLine);
  width: 100%;
`;
