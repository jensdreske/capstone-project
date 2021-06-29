import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

import target from "../images/target@2x.png";
import happyEarth from "../images/happy_earth.png";

import GameScores from "./GameScores";

import Hint from "../components/Hint";

import { roundPlaces } from "../lib/roundPlaces";

export default function Footer({ playerScore, countryData, isStatic }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hintIndex, setHintIndex] = useState([0, 0]);

  // console.log(window.location.pathname);

  useEffect(() => setRightHint(playerScore, setHintIndex), [playerScore]);

  function setRightHint(playerScore, setHintIndex) {
    if (playerScore.goal.emissions < 1) {
      setHintIndex([0, 1]);
      return;
    }
    if (
      roundPlaces(playerScore.individualCo2Emissions) ===
      roundPlaces(playerScore.averageCo2Emissions)
    ) {
      setHintIndex([1, 1]);
      return;
    }
    setHintIndex([0, 0]);

    // if (window.location.pathname === "/") {
    //   setHintIndex(2);
    //   return;
    // }
  }

  return (
    <FooterWrapper isStatic={isStatic}>
      <Hint hintIndex={hintIndex} setHintIndex={setHintIndex} />
      <NavLink to="/">
        <MenuButton className="standardBox">
          <img src={happyEarth} alt="main game view" />
        </MenuButton>
      </NavLink>
      <GameScores
        scrollPosition={scrollPosition}
        setScrollPosition={setScrollPosition}
        playerScore={playerScore}
        countryData={countryData}
      />
      <NavLink to="/goals">
        <MenuButton className="standardBox">
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
