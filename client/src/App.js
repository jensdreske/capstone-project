import { useState, useEffect } from "react";
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

const unitedNationsCountryId = 13; // Germany:13

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

  useEffect(() => getUnDataForAllSlices(unitedNationsCountryId), []);

  function getUnDataForAllSlices(countryId) {
    fetch(`/unfcc/get_share_emissions/10464/${countryId}`)
      .then((result) => result.json())
      .then((result) => {
        countryData.emissionsUnfcc.emission = result.emissions;
        countryData.countryName = result.country;
        setCountryData({ ...countryData });
      });
    countryData.emissionsUnfcc.slices.forEach((slice, index) => {
      if (!isNaN(slice.unfccId)) getUnData(slice.unfccId, index, countryId);
      if (Array.isArray(slice.unfccId)) {
        slice.emission = 0;
        slice.unfccId.map((sliceId) =>
          fetch(`/unfcc/get_share_emissions/${sliceId}/${countryId}`)
            .then((result) => result.json())
            .then((result) => {
              slice.emission += result.emissions;
              setCountryData({ ...countryData });
            })
        );
      }
    });
  }

  function getUnData(unfccId, sliceIndex, countryId) {
    fetch(`/unfcc/get_share_emissions/${unfccId}/${countryId}`)
      .then((result) => result.json())
      .then((emission) => {
        countryData.emissionsUnfcc.slices[sliceIndex].emission =
          emission.emissions;
        setCountryData({ ...countryData });
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
            <FlagButton
              onClick={() => getUnDataForAllSlices(unitedNationsCountryId)}
            >
              <img
                src="https://flagcdn.com/w20/de.png"
                width="30"
                height="20"
                alt="country flag"
              />
            </FlagButton>
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

const FlagButton = styled.button`
  border: none;
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: none;
  opacity: 50%;
`;
export default App;
