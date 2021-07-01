import styled from "styled-components/macro";

import target from "../images/target@2x.png";

export default function ResultBox({ title, result, annotation }) {
  return (
    <GoalResultWrapper>
      <IconBox>
        <img src={target} alt="target" height="50" width="50" />
      </IconBox>
      <section>
        <Title>{title}</Title>
        <Result>{result} kg</Result>
        <Annotation>{annotation}</Annotation>
      </section>
    </GoalResultWrapper>
  );
}

const GoalResultWrapper = styled.article`
  align-items: center;
  background: #fffa;
  border-radius: var(--boxRadius);
  border: var(--borderLine);
  display: flex;

  margin: 1rem 0 0.25rem 0;
  max-width: 30rem;
  padding: 0.25rem;
  width: 100%;
  section {
    text-align: left;
  }
`;
const Title = styled.p`
  font-weight: 500;
`;

const Result = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Annotation = styled.p`
  font-size: 0.8rem;
`;

const IconBox = styled.div`
  width: 5rem;
  height: 4rem;
  display: grid;
  place-content: center;
  margin-right: 0.25rem;
`;
