import styled from "styled-components/macro";

import { roundPlaces } from "../lib/roundPlaces.js";

import finish from "../images/finish@2x.png";
import clock from "../images/clock@2x.png";
import piggy from "../images/piggybank_co2@2x.png";
import target from "../images/target@2x.png";

export default function GameScores({
  playerScore,
  countryData,
  scrollPos,
  setScrollPos,
}) {
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

  function calculateSavings() {
    return roundPlaces(
      100 -
        (playerScore.individualCo2Emissions / playerScore.averageCo2Emissions) *
          100
    );
  }
  return (
    <ScoreboxWrapper>
      <ScrollLayer style={{ top: `${scrollPos * -4}rem` }}>
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
          scrollPos={scrollPos}
          setScrollPos={setScrollPos}
        />
        <ScoreboxElement
          icon={target}
          h2={roundPlaces(playerScore.goal.emissions) + " kg"}
          p="your goal"
          positionlink={2}
          scrollPos={scrollPos}
          setScrollPos={setScrollPos}
        />
        <ScoreboxElement
          icon={piggy}
          h2={`${Math.abs(calculateSavings())}% `}
          p={`${calculateSavings() >= -0.01 ? `less` : `more`} CO2 / Year`}
          positionlink={3}
          scrollPos={scrollPos}
          setScrollPos={setScrollPos}
        />
        <ScoreboxElement
          icon={clock}
          h2={calculateGameEnd(playerScore, countryData)}
          p="Carbon Exit"
          positionlink={0}
          scrollPos={scrollPos}
          setScrollPos={setScrollPos}
        />
      </ScrollLayer>
    </ScoreboxWrapper>
  );
}

function ScoreboxElement({
  icon,
  h2,
  p,
  positionlink,
  scrollPos,
  setScrollPos,
}) {
  const swipe = { start: 0, stop: 0 };
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

const ScrollLayer = styled.div`
  position: absolute;
  transition: top 2s;
  top: 0;
`;

const ScoreboxWrapper = styled.div`
  width: 14rem;
  height: 4rem;
  position: relative;
  margin: 0 0.25rem;
  overflow: hidden;
`;
