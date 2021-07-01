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
      <h4>Custom goals:</h4>
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
  margin: 1.5rem 0;
  width: 100%;
  max-width: 30rem;
`;
