import styled from "styled-components/macro";

import CustomItemBox from "../components/CustomItemBox";

export default function CustomGoals({
  goals,
  setGoals,
  emissionsFromGoals,
  setEmissionsFromGoals,
}) {
  return (
    <CustomGoalsWrapper>
      {Object.keys(goals.customGoals).length > 0 && <h3>Custom Goals</h3>}
      <CustomItemBox
        goals={goals}
        setGoals={setGoals}
        emissionsFromGoals={emissionsFromGoals}
        setEmissionsFromGoals={setEmissionsFromGoals}
      />
    </CustomGoalsWrapper>
  );
}

const CustomGoalsWrapper = styled.article`
  width: 100%;
  margin: 1.5rem 0;
  max-width: 30rem;
`;
