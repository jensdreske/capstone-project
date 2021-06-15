import { useEffect, useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import styled from "styled-components";

import Shares from "./components/Shares";
import { roundPlaces } from "./lib/roundPlaces.js";

import { startShares, shares, player } from "./variables.js";
import { SharesUnfcc } from "./components/Shares.js";

function App() {
  const [serverMessage, setServerMessage] = useState("");
  const [carbonApiStatus, setCarbonApiStatus] = useState("");
  const [testResponse, setTestResponse] = useState({});
  const [emissionView, setEmissionView] = useState(startShares);
  const [emissionsUncff, setemissionsUncff] = useState(shares);
  const [emissionHistory, setEmissionHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/")
      .then((res) => res.json())
      .then((response) => setServerMessage(response));
  }, []);

  useEffect(() => {
    getEmissions();
  }, []);

  function testServerRequest() {
    fetch("http://localhost:4000/carboninterface/auth")
      .then((res) => res.json())
      .then((res) => setCarbonApiStatus(res));
  }

  function getCar() {
    fetch("http://localhost:4000/carboninterface/getcar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "vehicle",
        distance_unit: "km",
        distance_value: 99,
        vehicle_model_id: "c3334a98-cf8d-48a3-843a-3bef3f107c92",
      }),
    })
      .then((res) => res.json())
      .then((res) => setTestResponse(res));
  }

  function getEmissions(unfccId = 8677) {
    // will be removed for later
    fetch(`http://localhost:4000/unfcc/getemissions/${unfccId}/13/2018`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        shares.country = res.data[0].name;
        shares.year = res.columns[0].name;
        shares.yearId = res.data[0].name;
        shares.slices = [];
        for (let i = 0; i < res.data[0].rows.length; i++) {
          if (res.data[0].rows[i].id !== 8533) {
            shares.slices[i] = {
              id: res.data[0].rows[i].id,
              name: res.data[0].rows[i].name,
              emission: res.data[0].rows[i].cells.length
                ? res.data[0].rows[i].cells[0].numberValue
                : 0,
              percentage: res.data[0].rows[i].cells.length
                ? (res.data[0].rows[i].cells[0].numberValue /
                    res.data[0].rows[0].cells[0].numberValue) *
                  100
                : 0,
              percentageOfTotal: res.data[0].rows[i].cells.length
                ? (res.data[0].rows[i].cells[0].numberValue / shares.total) *
                  100
                : 0,
            };
          }
        }
        setemissionsUncff(shares);
        const history = emissionHistory.slice(0, 12);
        setEmissionHistory([unfccId, ...history]);
        console.log(shares);
      });
  }

  function getBack() {
    getEmissions(emissionHistory[1]);
    console.log(emissionHistory[0]);
    const history = emissionHistory.splice(0, 2);
    setEmissionHistory(history);
  }

  return (
    <>
      <header>
        <p>CO2</p>
        <p>
          Score: {String(player.averageCo2Emissions).replace(".", ",")}{" "}
          {player.unit} CO2 /Jahr
        </p>
        <hr />
      </header>
      <Switch>
        <Route exact path="/transport">
          <p>Transportation</p>
          <p> choose Car </p>
          <p>7.5 l/100km</p>
          <p>fahrleistung pro Jahr</p>
          <p>10978,4 km</p>
          <hr />
          <p>
            {roundPlaces(player.car.kmPerYear * player.car.co2Per100km)} kg CO2
            / Jahr
          </p>
        </Route>
        <Route exact path="/dev">
          <SharesUnfcc
            shares={emissionsUncff}
            getBack={getBack}
            getEmissions={getEmissions}
          />
          <NavLink exact to="/">
            back to main
          </NavLink>
          <div onClick={() => getEmissions()} style={{ cursor: "pointer" }}>
            get German co2 data for 2018 via server
          </div>
          {/* <div onClick={() => getBack()} style={{ cursor: "pointer" }}>
            BACK
          </div> */}

          <div>Server says: {serverMessage} </div>

          <div
            onClick={() => testServerRequest()}
            style={{ cursor: "pointer" }}
          >
            check CarbonInterface Authorization via Server
          </div>
          <div>CarbonInterface API Status: {carbonApiStatus.message}</div>
          <div onClick={() => getCar()} style={{ cursor: "pointer" }}>
            get Car
          </div>
          <div>{JSON.stringify(testResponse)}</div>
          {/* <div>{JSON.stringify(emissionsUncff)}</div> */}
        </Route>

        <Route path="/">
          <Shares shares={emissionView} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
