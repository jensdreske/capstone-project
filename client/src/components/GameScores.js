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
    return days;
  }

  function daysToYears(days) {
    if (days < 0) return "Never";
    const years = roundPlaces(days / 365);
    const daysLeft = days % 365;
    if (years > 1000) return "Never";
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
          h2={daysToYears(calculateDays())}
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
          h2={calculateGameEnd()}
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
    <Scorebox
      // onClick={() => setScrollPos(positionlink)}
      onTouchStart={(event) => {
        // console.log("start" + event.touches[0].clientY);
        swipe.start = event.touches[0].pageY;
        setScrollPos(positionlink);
      }}
      onTouchMove={(event) => {
        swipe.move = event.touches[0].pageY;
        // swipe.moveScaled = (swipe.start - swipe.move) / 16 / 100;
        // setScrollPos((scrollPos + swipe.moveScaled) % 4);
        // console.log(swipe.moveScaled);
      }}
      onTouchEnd={(event) => {
        console.log("end" + event.changedTouches[0].pageY);
        swipe.stop = event.changedTouches[0].pageY;
        swipe.delta = swipe.start - swipe.stop;
        console.log(Math.round(swipe.delta / 75));
        // if (swipe.start > swipe.stop) {
        //   setScrollPos(scrollPos + 1);
        // }
        // if (swipe.start < swipe.stop) {
        // setScrollPos(scrollPos + Math.round(swipe.delta / 75));
        // }
      }}
      //   onTouchEnd={(event) => console.log(event.changedTouches[0])}
    >
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
  /* display: flex;
  justify-content: center; */
  position: relative;
  margin: 0 0.25rem;
  overflow: hidden;
`;
