import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

import { roundPlaces } from "../lib/roundPlaces.js";

import finish from "../images/finish@2x.png";
import clock from "../images/clock@2x.png";
import piggy from "../images/piggybank_co2@2x.png";
import target from "../images/target@2x.png";
import chart from "../images/chart.png";
import list from "../images/list.png";

export default function Footer({ playerScore, countryData, isStatic }) {
  const [scrollPos, setScrollPos] = useState(0);

  function calculateGameEnd(playerScore, countryData) {
    const co2BudgetLeftInGigaTons = 3.5;
    const co2BudgetCalculationStartYear = 2020;
    const progressiveLinearReductionFactor = 2;
    const tonsToGigaTonsFactor = Math.pow(10, 9);
    const unitedNationsByGermanTotalCo2 =
      countryData.emissionsUnfcc.emission / countryData.emissions;
    const yearOfExit =
      co2BudgetCalculationStartYear +
      progressiveLinearReductionFactor *
        (co2BudgetLeftInGigaTons /
          (((playerScore.individualCo2Emissions * countryData.population) /
            tonsToGigaTonsFactor) *
            unitedNationsByGermanTotalCo2));
    return roundPlaces(yearOfExit, 0);
  }

  function calculateDaysToReachGoal(
    goalInKg,
    averageCo2Emissions,
    individualCo2Emissions
  ) {
    const goalInTons = goalInKg / 1000;
    const daysPerYear = 365;
    const daysToReachGoal = roundPlaces(
      (goalInTons / (averageCo2Emissions - individualCo2Emissions)) *
        daysPerYear,
      0
    );
    return daysToReachGoal;
  }

  function daysOrYearsToGo(days) {
    const years = roundPlaces(days / 365);
    if (days < 0 || years >= 1000) return "Never";
    if (years > 1) return years + " years ";
    return days + " days";
  }

  function ScoreboxElement({ icon, h2, p, positionlink }) {
    return (
      <Scorebox onClick={() => setScrollPos(positionlink)}>
        <div className="iconBox">
          <img src={icon} alt="" />
        </div>
        <section>
          <h2>{h2}</h2>
          <p>{p}</p>
        </section>
      </Scorebox>
    );
  }

  function GameScores({ scrollPosition, setScrollPos }) {
    function calculateSavings() {
      return roundPlaces(
        100 -
          (playerScore.individualCo2Emissions /
            playerScore.averageCo2Emissions) *
            100
      );
    }
    return (
      <ScoreboxWrapper>
        <div
          className="scoreBoxes"
          style={{ top: `${scrollPosition * -4}rem` }}
        >
          {/* <div className={"scoreBoxes " + "score" + scrollPosition} > */}
          <ScoreboxElement
            icon={finish}
            h2={daysOrYearsToGo(
              calculateDaysToReachGoal(
                playerScore.goal.emissions,
                playerScore.averageCo2Emissions,
                playerScore.individualCo2Emissions
              )
            )}
            p="time to reach goal"
            positionlink={1}
          />
          <ScoreboxElement
            icon={target}
            h2={roundPlaces(playerScore.goal.emissions) + " kg"}
            p="your goal"
            positionlink={2}
          />
          <ScoreboxElement
            icon={piggy}
            h2={`${Math.abs(calculateSavings())}% `}
            p={`${calculateSavings() >= -0.01 ? `less` : `more`} CO2 / Year`}
            positionlink={3}
          />
          <ScoreboxElement
            icon={clock}
            h2={calculateGameEnd(playerScore, countryData)}
            p="Carbon Exit"
            positionlink={0}
          />
        </div>
      </ScoreboxWrapper>
    );
  }

  return (
    <FooterWrapper isStatic={isStatic}>
      <NavLink exact to="/">
        <MenuButton className="standardBox">
          <img src={chart} alt="mainmenu" />
        </MenuButton>
      </NavLink>

      <GameScores scrollPosition={scrollPos} setScrollPos={setScrollPos} />

      <MenuButton className="standardBox">
        <img src={list} alt="set goals" />
      </MenuButton>
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
  overflow: hidden;
  .standardBox {
    border: 2px solid black;
    border-radius: 6px;
    background-color: white;
  }
  z-index: 100;
`;

const ScoreboxWrapper = styled.div`
  width: 14rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  position: relative;
  margin: 0 0.25rem;
  .scoreBoxes {
    position: absolute;
    transition: top 2s;
  }
`;

const Scorebox = styled.article`
  cursor: pointer;
  border: 2px solid black;
  background-color: white;
  border-radius: 6px;
  display: flex;
  width: 14rem;
  height: 4rem;
  .iconBox {
    height: 100%;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 90%;
  }
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    margin-left: 0.5rem;
  }
`;
