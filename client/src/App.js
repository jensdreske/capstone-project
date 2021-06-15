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
      </footer>
    </>
  );
}

export default App;
