import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components/macro";

import MainGameView from "./pages/MainGameView";
import Transportation from "./pages/Transportation";
import Goals from "./pages/Goals";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { countryData as countryDataInit, player } from "./lib/variables.js";

function App() {
  const [countryEmissions, setCountryEmissions] = useState(
    countryDataInit.emissionsUnfcc
  );
  const [playerScore, setPlayerScore] = useState(player);
  const [countryData, setCountryData] = useState(countryDataInit);
  const [checkedGoals, setCheckedGoals] = useState([]);
  const [emissionsFromGoals, setEmissionsFromGoals] = useState({});

  return (
    <>
      <BackgroundBox />
      <Header />
      <MainBox>
        <Switch>
          <Route path="/transport">
            <Transportation
              player={playerScore}
              setPlayer={setPlayerScore}
              countryData={countryData}
            />
          </Route>
          <Route path="/goals">
            <Goals
              player={playerScore}
              setPlayerScore={setPlayerScore}
              checkedGoals={checkedGoals}
              setCheckedGoals={setCheckedGoals}
              emissionsFromGoals={emissionsFromGoals}
              setEmissionsFromGoals={setEmissionsFromGoals}
            />
          </Route>
          <Route path="/">
            <MainGameView countryEmissions={countryEmissions} />
          </Route>
        </Switch>
      </MainBox>
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

const MainBox = styled.main`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
`;

export default App;
