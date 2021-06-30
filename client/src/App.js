import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components/macro";

import MainGameView from "./pages/MainGameView";
import Transportation from "./pages/Transportation";
import Goals from "./pages/Goals";

import Header from "./components/Header";
import Footer from "./components/Footer";

import {
  countryData as countryDataInit,
  player,
  goals as initGoals,
} from "./lib/variables.js";

function App() {
  const [countryEmissions, setCountryEmissions] = useState(
    countryDataInit.emissionsUnfcc
  );
  const [playerScore, setPlayerScore] = useState(player);
  const [countryData, setCountryData] = useState(countryDataInit);
  const [emissionsFromGoals, setEmissionsFromGoals] = useState({});
  const [goals, setGoals] = useState(initGoals);
  const [communityGoals, setCommunityGoals] = useState([]);
  const [scoreScrollPosition, setScoreScrollPosition] = useState(2);

  function getUnDataForAllSlices(countryId) {
    countryData.emissionsUnfcc.slices.forEach((slice, index) => {
      // if (!isNaN(slice[index].unfccId)) getUnData(slice[index].unfccId);
      // getUnData(slice[0].unfccId);
      if (!isNaN(slice.unfccId)) getUnData(slice.unfccId, index, countryId);
      if (Array.isArray(slice.unfccId)) {
        slice.emission = 0;
        slice.unfccId.map((sliceId) =>
          fetch(`/unfcc/get_share_emissions/${sliceId}/${countryId}`)
            .then((result) => result.json())
            .then((result) => (slice.emission += result.emissions))
        );
      }
    });
  }

  function getUnData(unfccId, sliceIndex, countryId) {
    // http://localhost:4000/unfcc/get_share_emissions/:id/:countryId
    fetch(`/unfcc/get_share_emissions/${unfccId}/${countryId}`)
      .then((result) => result.json())
      .then((emission) => {
        countryData.emissionsUnfcc.slices[sliceIndex].emission =
          emission.emissions;
        setCountryData({ ...countryData });
        console.log(emission.emissions);
      })
      .catch((error) => console.log(error.message));
  }

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
              playerScore={playerScore}
              setPlayerScore={setPlayerScore}
              goals={goals}
              setGoals={setGoals}
              emissionsFromGoals={emissionsFromGoals}
              setEmissionsFromGoals={setEmissionsFromGoals}
              communityGoals={communityGoals}
              setCommunityGoals={setCommunityGoals}
              setScoreScrollPosition={setScoreScrollPosition}
            />
          </Route>
          <Route path="/">
            <MainGameView
              countryEmissions={countryEmissions}
              countryData={countryData}
            />
            <button onClick={() => getUnDataForAllSlices(20)}>
              update UNFCC{countryData.emissionsUnfcc.slices[0].unfccId}
            </button>
          </Route>
        </Switch>
      </MainBox>
      <Footer
        playerScore={playerScore}
        countryData={countryData}
        scoreScrollPosition={scoreScrollPosition}
        setScoreScrollPosition={setScoreScrollPosition}
      />
    </>
  );
}

const BackgroundBox = styled.div`
  background-image: linear-gradient(hsl(200, 50%, 60%), hsl(80, 25%, 66%));
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: -10;
  top: 0;
  bottom: 0;
`;

const MainBox = styled.main`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 7rem 0 6rem;
`;

export default App;
