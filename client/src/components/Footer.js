import { useState } from "react";
import styled from "styled-components/macro";

import list from "../images/list.png";

import GameScores from "./GameScores";

export default function Footer({ playerScore, countryData, isStatic }) {
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <FooterWrapper isStatic={isStatic}>
      <MenuButton className="standardBox">
        <img src={list} alt="set goals" />
      </MenuButton>
      <GameScores
        scrollPosition={scrollPosition}
        setScrollPosition={setScrollPosition}
        playerScore={playerScore}
        countryData={countryData}
      />
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
