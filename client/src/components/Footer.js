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
  countryData,
  isStatic,
  scoreScrollPosition,
  setScoreScrollPosition,
}) {
  const [hintIndex, setHintIndex] = useState([0, -50, 20]);

  useEffect(() => setTheRightHint(playerScore, setHintIndex), [playerScore]);

  function setTheRightHint(playerScore, setHintIndex) {
    if (playerScore.goal.emissions < 1) {
      setHintIndex([0, 9, 8]);
      return;
    }
    if (
      roundPlaces(playerScore.individualCo2Emissions) ===
      roundPlaces(playerScore.averageCo2Emissions)
    ) {
      setHintIndex([1, 50, 10]);
      return;
    }
    setHintIndex([0, 30, -20]);
  }

  return (
    <FooterWrapper isStatic={isStatic}>
      <Hint
        hintIndex={hintIndex}
        setHintIndex={setHintIndex}
        scoreScrollPosition={scoreScrollPosition}
        setScoreScrollPosition={setScoreScrollPosition}
      />
      <NavLink to="/" onClick={() => setScoreScrollPosition(0)}>
        <MenuButton className="standardBox">
          <img src={happyEarth} alt="main game view" />
        </MenuButton>
      </NavLink>
      <GameScores
        scoreScrollPosition={scoreScrollPosition}
        setScoreScrollPosition={setScoreScrollPosition}
        playerScore={playerScore}
        countryData={countryData}
      />
      <NavLink to="/goals" onClick={() => setScoreScrollPosition(1)}>
        <MenuButton className="standardBox" data-test-id="goal-button">
          <img src={target} alt="set goals" />
        </MenuButton>
      </NavLink>
    </FooterWrapper>
  );
}

const MenuButton = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 70%;
  }
`;

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  position: ${(props) => (props.isStatic ? "static" : "fixed")};
  bottom: 1rem;
  width: ${(props) => (props.isStatic ? "100%" : "100vw")};
  height: 4rem;

  .standardBox {
    border: 2px solid black;
    border-radius: 6px;
    background-color: white;
  }
  z-index: 100;
`;
