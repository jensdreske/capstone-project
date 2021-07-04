import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

import target from "../images/target@2x.png";
import happyEarth from "../images/happy_earth.png";

import GameScores from "./GameScores";

import Hint from "../components/Hint";

import { roundPlaces } from "../lib/roundPlaces";

export default function Footer({
  playerScore,
  setPlayerScore,
  countryData,
  isStatic,
  scoreScrollPosition,
  setScoreScrollPosition,
}) {
  const [hintIndex, setHintIndex] = useState([0, -50, -200]);

  useEffect(() => setTheRightHint(playerScore, setHintIndex), [playerScore]);

  useEffect(
    () => calculateSavings(playerScore),
    [playerScore.individualCo2Emissions]
  );

  function calculateSavings(playerScore) {
    playerScore.savingsInPercent = roundPlaces(
      100 -
        (playerScore.individualCo2Emissions / playerScore.averageCo2Emissions) *
          100
    );
    setPlayerScore({ ...playerScore });
  }

  function setTheRightHint(playerScore, setHintIndex) {
    if (playerScore.goal.emissions < 1) {
      setHintIndex([0, -5, 75]);
      return;
    }
    if (
      roundPlaces(playerScore.individualCo2Emissions) ===
      roundPlaces(playerScore.averageCo2Emissions)
    ) {
      setHintIndex([1, 57, 65]);
      return;
    }
    setHintIndex([0, 30, -200]);
  }

  return (
    <FooterWrapper isStatic={isStatic}>
      <ButtonContainer>
        <Hint
          hintIndex={hintIndex}
          setHintIndex={setHintIndex}
          scoreScrollPosition={scoreScrollPosition}
          setScoreScrollPosition={setScoreScrollPosition}
        />
        <NavLink to="/" onClick={() => setScoreScrollPosition(0)}>
          <MenuButton>
            <img src={happyEarth} alt="main game view" />
          </MenuButton>
        </NavLink>
        <GameScores
          scoreScrollPosition={scoreScrollPosition}
          setScoreScrollPosition={setScoreScrollPosition}
          playerScore={playerScore}
          countryData={countryData}
          setPlayerScore={setPlayerScore}
        />
        <NavLink to="/goals" onClick={() => setScoreScrollPosition(1)}>
          <MenuButton data-test-id="goal-button">
            <img src={target} alt="set goals" />
          </MenuButton>
        </NavLink>
      </ButtonContainer>
    </FooterWrapper>
  );
}
const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  position: ${(props) => (props.isStatic ? "static" : "fixed")};
  bottom: 1rem;
  width: ${(props) => (props.isStatic ? "100%" : "100vw")};
  height: 4rem;
  z-index: 100;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const MenuButton = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-radius: 6px;
  background-color: white;
  img {
    height: 70%;
  }
`;
