import { useEffect, useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import styled from "styled-components/macro";

import MainGameView from "./pages/MainGameView";
import Transportation from "./pages/Transportation";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { countryData, shares, player } from "./variables.js";
import { SharesUnfcc } from "./components/SharesUnfcc.js";

function App() {
  const [serverMessage, setServerMessage] = useState("");
  const [countryEmissions, setCountryEmissions] = useState(
    countryData.emissionsUnfcc
  );
  const [playerScore, setPlayerScore] = useState(player);
  const [countryDataState, setCountryDataState] = useState(countryData);

  useEffect(() => {
    fetch("http://localhost:4000/health")
      .then((res) => res.json())
      .then((response) => setServerMessage(response));
  }, []);

  useEffect(() => {
    console.log(serverMessage);
  }, [serverMessage]);

  return (
    <>
      <BackgroundBox />
      <Header />
      <Switch>
        <Route path="/transport">
          <Transportation player={playerScore} setPlayer={setPlayerScore} />
        </Route>
        <Route path="/unfcc">
          <SharesUnfcc shares={shares} />
        </Route>
        <Route path="/">
          <MainGameView countryEmissions={countryEmissions} />
        </Route>
      </Switch>
      <Footer playerScore={playerScore} countryData={countryDataState} />
    </>
  );
}

const BackgroundBox = styled.div`
  /* background-color: hsl(200, 40%, 90%); */
  background-image: linear-gradient(hsl(200, 50%, 60%), hsl(80, 25%, 66%));
  height: 120vh;
  width: 100%;
  position: absolute;
  z-index: -10;
  top: 0;
  bottom: 0;
`;

export default App;
