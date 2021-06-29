import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import { Switch, Route } from "react-router-dom";
export default function Hint({ hintIndex, setHintIndex }) {
  return (
    <HintBalloon hintIndex={hintIndex}>
      <HintContainer>
        <HintScrollBox hintIndex={hintIndex}>
          <NavLink to="/goals">
            <HintText>Set yourself a Goal!</HintText>
          </NavLink>
          <NavLink to="/">
            <HintText>Choose an area and change some habits!</HintText>
          </NavLink>
        </HintScrollBox>
      </HintContainer>
    </HintBalloon>
  );
}

const HintBalloon = styled.section`
  position: fixed;
  bottom: ${(props) => props.hintIndex[1] * 6 - 5 + "rem"};
  width: 14rem;
  z-index: 101;
  background: #fffd;
  border-radius: var(--boxRadius);
  border: var(--borderLine);
  height: 4rem;
  transition: bottom 1s;
  overflow: hidden;
`;

const HintContainer = styled.section`
  position: relative;
`;

const HintScrollBox = styled.section`
  position: absolute;
  top: ${(props) => props.hintIndex[0] * -4 + "rem"};
  transition: top 2s;
`;

const HintText = styled.section`
  padding: 0 2rem;
  height: 4rem;
  display: grid;
  place-items: center;
  background: #fffd;
  font-size: 0.8rem;
`;
