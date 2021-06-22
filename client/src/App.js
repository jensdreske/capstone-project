import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components/macro";

import MainGameView from "./pages/MainGameView";
import Transportation from "./pages/Transportation";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { countryData as countryDataInit, player } from "./lib/variables.js";

function App() {
  const [countryEmissions, setCountryEmissions] = useState(
    countryDataInit.emissionsUnfcc
  );
  const [playerScore, setPlayerScore] = useState(player);
  const [countryData, setCountryData] = useState(countryDataInit);

  return (
    <>
      <BackgroundBox />
      <Header />
      <Switch>
        <Route path="/transport">
          <Transportation player={playerScore} setPlayer={setPlayerScore} />
        </Route>

        <Route path="/">
          <MainGameView countryEmissions={countryEmissions} />
        </Route>
      </Switch>
      <Footer playerScore={playerScore} countryData={countryData} />
    </>
  );
}

const BackgroundBox = styled.div`
  background-image: linear-gradient(hsl(200, 50%, 60%), hsl(80, 25%, 66%));
  height: 120vh;
  width: 100%;
  position: absolute;
  z-index: -10;
  top: 0;
  bottom: 0;
`;

export default App;
