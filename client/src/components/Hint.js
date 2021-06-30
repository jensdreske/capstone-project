import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import { Switch, Route } from "react-router-dom";

import CloudBox from "../images/cloud_box.svg";

export default function Hint({
  hintIndex,
  setHintIndex,
  scoreScrollPosition,
  setScoreScrollPosition,
}) {
  return (
    <HintBalloon hintIndex={hintIndex}>
      <HintContainer>
        <HintScrollBox hintIndex={hintIndex}>
          <NavLink to="/goals">
            <HintText>Set yourself a Goal!</HintText>
          </NavLink>
          <NavLink to="/" onClick={() => setScoreScrollPosition(2)}>
            <HintText>Choose an area and change some habits!</HintText>
          </NavLink>
        </HintScrollBox>
      </HintContainer>
    </HintBalloon>
  );
}

const HintBalloon = styled.section`
  position: fixed;
  bottom: ${(props) => props.hintIndex[2] + "%"};
  right: ${(props) => props.hintIndex[1] + "%"};
  width: 11rem;
  z-index: 101;
  background-image: url(${CloudBox});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 6rem;
  transition: right 2s ease-out, bottom 2s ease-in-out;
  display: grid;
  place-items: center;
`;

const HintContainer = styled.section`
  position: relative;
  overflow: hidden;
  height: 3rem;
  width: 100%;
`;

const HintScrollBox = styled.section`
  position: absolute;
  top: ${(props) => props.hintIndex[0] * -3 + "rem"};
  transition: top 1s;
`;

const HintText = styled.section`
  padding: 0 1rem;
  height: 3rem;
  display: grid;
  place-items: center;
  /* background: #fffd; */
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1rem;
`;
