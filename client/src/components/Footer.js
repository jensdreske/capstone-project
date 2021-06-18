import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

import { roundPlaces } from "../lib/roundPlaces.js";

import finish from "../images/finish@2x.png";
import clock from "../images/clock@2x.png";
import piggy from "../images/piggybank_co2@2x.png";
import target from "../images/target@2x.png";

export default function Footer({ playerScore, countryData }) {
  const [scrollPos, setScrollPos] = useState(0);
  function calculateGameEnd(reductionPerYear = 0) {
    const linearReduction = 2;
    const brdToUnfcc = 0.7;
    const co2BudgetLeft = 3.5;
    const yearOfExit =
      2020 +
      linearReduction *
        (co2BudgetLeft /
          (((playerScore.individualCo2Emissions * countryData.population) /
            1000000000) *
            brdToUnfcc));
    return roundPlaces(yearOfExit, 0);
  }

  function calculateDays() {
    const days = roundPlaces(
      (playerScore.goal.emissions /
        1000 /
        (playerScore.averageCo2Emissions -
          playerScore.individualCo2Emissions)) *
        365,
      0
    );
    return days > 0 ? days + " days" : "Never!";
  }

  function GameScores({ scrollPosition }) {
    function ScoreboxGenerator({ icon, h2, p, positionlink }) {
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

    return (
      <ScoreboxWrapper>
        <div className="scoreBoxes" style={{ top: `${scrollPosition}rem` }}>
          <ScoreboxGenerator
            icon={finish}
            h2={calculateDays()}
            p="to reach goal"
            positionlink={-4}
          />
          <ScoreboxGenerator
            icon={target}
            h2={roundPlaces(playerScore.goal.emissions) + " kg"}
            p="your goal"
            positionlink={-8}
          />
          <ScoreboxGenerator
            icon={piggy}
            h2={
              roundPlaces(
                100 -
                  (playerScore.individualCo2Emissions /
                    playerScore.averageCo2Emissions) *
                    100
              ) + "%"
            }
            p="less CO2"
            positionlink={-12}
          />
          <ScoreboxGenerator
            icon={clock}
            h2={calculateGameEnd()}
            p="Carbon Exit"
            positionlink={0}
          />
        </div>
      </ScoreboxWrapper>
    );
  }

  return (
    <footer>
      <GameScores scrollPosition={scrollPos} />
      <NavLink exact to="/score">
        <p>score details</p>
      </NavLink>
      <div>your goal: {playerScore.goal.emissions} kg</div>
      <div>
        savings per year:{" "}
        {roundPlaces(
          playerScore.averageCo2Emissions - playerScore.individualCo2Emissions
        )}{" "}
        t
      </div>
    </footer>
  );
}

const ScoreboxWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 1rem;
  width: 100%;
  height: 4rem;
  overflow: hidden;
  .scoreBoxes {
    position: absolute;
    animation-name: scroll;
    animation-duration: 2s;
  }
  @keyframes scroll {
    0% {
      top: 12rem;
    }
    100% {
      top: scrollPosition;
    }
  }
`;

const Scorebox = styled.article`
  cursor: pointer;
  border: 2px solid black;
  background-color: white;
  border-radius: 6px;
  display: flex;
  width: 15rem;
  height: 4rem;
  .iconBox {
    height: 100%;
    width: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    height: 90%;
  }
  section {
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    margin-left: 1rem;
  }
`;
