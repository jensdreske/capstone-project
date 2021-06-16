import { useEffect, useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import styled from "styled-components";

import Shares from "./components/Shares";
import { roundPlaces } from "./lib/roundPlaces.js";

import { countryData, shares, player } from "./variables.js";
import { SharesUnfcc } from "./components/SharesUnfcc.js";

import Transportation from "./pages/Transportation";

function App() {
  const [serverMessage, setServerMessage] = useState("");
  const [countryEmissions, setCountryEmissions] = useState(
    countryData.emissionsUnfcc
  );
  const [playerScore, setPlayerScore] = useState(player);

  useEffect(() => {
    fetch("http://localhost:4000/")
      .then((res) => res.json())
      .then((response) => setServerMessage(response));
  }, []);

  return (
    <>
      <header>
        <p>CO2</p>
        <p>Score:</p>
        <p>individual {roundPlaces(playerScore.individualCo2Emissions)}</p>
        <p>
          average: {roundPlaces(playerScore.averageCo2Emissions)}
          {player.unit} CO2 /Jahr
        </p>
        <hr />
      </header>
      <Switch>
        <Route path="/transport">
          <Transportation player={playerScore} setPlayer={setPlayerScore} />
        </Route>
        <Route path="/unfcc">
          <SharesUnfcc shares={shares} />
        </Route>

        <Route path="/">
          <Shares shares={countryEmissions} />
        </Route>
      </Switch>
      <footer>
        <hr />
        <NavLink exact to="/">
          <p>Overview</p>
        </NavLink>
        <div>your goal: {player.goal.emissions} kg</div>
        <div>
          days to reach goal: {calculateDays()}
          {/* {playerScore.individualCo2Emissions + goal.emissions / 1000} */}
        </div>
        <div>
          savings per year:{" "}
          {roundPlaces(
            playerScore.averageCo2Emissions - playerScore.individualCo2Emissions
          )}{" "}
          t
        </div>
        <div>
          compared to ø{" "}
          {roundPlaces(
            (playerScore.individualCo2Emissions /
              playerScore.averageCo2Emissions) *
              100
          )}
          %
        </div>
        <div>year we will need co2 neutrality to stay under 1,5° warming:</div>
        <div>{calculateGameEnd()}</div>
      </footer>
    </>
  );

  function calculateDays() {
    const days = roundPlaces(
      (playerScore.goal.emissions /
        1000 /
        (playerScore.averageCo2Emissions -
          playerScore.individualCo2Emissions)) *
        365,
      0
    );
    return days > 0 ? days : "never";
  }

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
}
export default App;
