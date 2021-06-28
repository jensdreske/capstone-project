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
      <h3>Custom goals:</h3>
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
  margin: 2rem 0;
  width: 100%;
`;
