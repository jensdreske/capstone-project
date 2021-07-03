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
    <>
      <h3>add a personal goal:</h3>
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
          onChange={(event) => updateGoalToAdd(event, goalToAdd, setGoalToAdd)}
          value={goalToAdd.goalName ? goalToAdd.goalName : ""}
        ></TextInput>
        <Co2Label htmlFor="goalCo2Emission">CO2 Emission in kg</Co2Label>
        <Co2Input
          required
          type="text"
          name="goalCo2Emission"
          id="goalCo2Emission"
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
        <SubmitCustomGoal type="submit" value="add this goal to the list" />
      </AddCustomGoalForm>
    </>
  );
}

const SubmitCustomGoal = styled.input`
  background: #fffa;
  border-radius: var(--boxRadius);
  border: var(--borderLine);
  padding: 0.25rem;
  grid-column-end: span 2;
`;

const AddCustomGoalForm = styled.form`
  align-items: center;
  background: #fffa;
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
  background: #fffa;
`;

const TextInput = styled.input`
  grid-column-start: 1;
  padding: 0.5rem;
  width: 100%;
  background: #fffa;
`;

const MultilineTextInput = styled.textarea`
  grid-column-start: 1;
  grid-column-end: span 2;
  padding: 0.5rem;
  resize: none;
  background: #fffa;
  border-radius: var(--boxRadius);
  border: var(--borderLine);
  width: 100%;
`;
