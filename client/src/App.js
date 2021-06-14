import { useEffect, useState } from "react";
import styled from "styled-components";

import { startShares } from "./variables.js";

function App() {
  const shares = {
    country: "Germany",
    year: 2018,
    total: [858000],
    slices: [
      {
        name: "total",
        emission: 7209000,
        percentage: 100,
        percentageOfTotal: 100,
      },
      {
        name: "energy",
        emission: 7209000,
        percentage: 84,
        percentageOfTotal: 84,
      },
      {
        name: "industry",
        emission: 64000,
        percentage: 8,
        percentageOfTotal: 8,
      },
      {
        name: "agriculture",
        emission: 63000,
        percentage: 7,
        percentageOfTotal: 7,
      },
      { name: "waste", emission: 9000, percentage: 1, percentageOfTotal: 1 },
      { name: "other", emission: 0, percentage: 0, percentageOfTotal: 0 },
    ],
  };

  const [serverMessage, setServerMessage] = useState("");
  const [carbonApiStatus, setCarbonApiStatus] = useState("");
  const [testResponse, setTestResponse] = useState({});
  const [emissionStart, setEmissionStart] = useState(shares);
  const [emissionHistory, setEmissionHistory] = useState([]);
  const [emissionView, setEmissionView] = useState(startShares);

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
        setEmissionStart(shares);
        const history = emissionHistory.slice(0, 12);
        setEmissionHistory([unfccId, ...history]);
        console.log(shares);
      });
  }

  function roundPlaces(float, places) {
    const power = Math.pow(10, places);
    return Math.round(float * power) / power;
  }

  function parseUncffName(str) {
    const newstr = str.split(" - ")[0].split(" ").slice(1);
    return newstr.reduce((acc, curr) => acc + " " + curr, " ");
  }

  function SharesUnfcc({ shares }) {
    console.log(shares);
    return (
      <>
        {shares.slices.map((slice, index) => {
          if (index === 0) {
            return (
              <SharesBox
                onClick={() => getBack()}
                style={{ width: slice.percentage + "%", height: "100%" }}
              >
                {Math.round(slice.percentageOfTotal)}% {slice.name} (id{" "}
                {slice.id})
              </SharesBox>
            );
          }
          if (slice.percentageOfTotal > 0.1 && index > 0) {
            return (
              <SharesSlice
                onClick={() => getEmissions(slice.id)}
                key={slice.id}
                style={{
                  height: slice.percentageOfTotal + "%",
                  width: slice.percentage + "%",
                }}
              >
                <SliceText>
                  <p>
                    {roundPlaces(slice.percentageOfTotal, 2)}% {slice.name}
                  </p>
                  <p>
                    {roundPlaces(slice.percentage, 2)}% of share (id {slice.id})
                  </p>
                </SliceText>
                <TooltipBox>
                  <Tooltip className="tooltipText">
                    <p>{parseUncffName(slice.name)}</p>
                    <p>{slice.id}</p>
                  </Tooltip>
                </TooltipBox>
              </SharesSlice>
            );
          }
          return null;
        })}
      </>
    );
  }

  function Shares({ shares }) {
    shares.slices.forEach((slice) => {
      slice.percentage = (slice.emission / shares.emission) * 100;
    });
    return (
      <>
        <SharesBox>
          <p>{shares.country}</p>
          <p>{shares.year}</p>
          <p>{shares.total} kt CO2</p>
        </SharesBox>
        {shares.slices.map((slice, index) => {
          return (
            <SharesSlice
              style={{
                height: `${slice.percentage}%`,
                width: `${slice.percentage}%`,
              }}
            >
              <SliceText>
                <p>{slice.name}</p>
              </SliceText>
              <TooltipBox>
                <Tooltip className="tooltipText">
                  <p>{slice.name}</p>
                  <p>{roundPlaces(slice.percentage, 2)}%</p>
                  <p>{slice.emission} kt CO2</p>
                </Tooltip>
              </TooltipBox>
            </SharesSlice>
          );
        })}
      </>
    );
  }

  function getBack() {
    getEmissions(emissionHistory[1]);
    console.log(emissionHistory[0]);
    const history = emissionHistory.splice(0, 2);
    setEmissionHistory(history);
  }

  return (
    <>
      <div onClick={() => getEmissions()} style={{ cursor: "pointer" }}>
        get German co2 data for 2018 via server
      </div>
      <div onClick={() => getBack()} style={{ cursor: "pointer" }}>
        BACK
      </div>

      <SharesCake>
        <Shares shares={emissionView} />
      </SharesCake>

      <SharesCake>
        <SharesUnfcc shares={emissionStart} />
      </SharesCake>

      <div>Server says: {serverMessage} </div>

      <div onClick={() => testServerRequest()} style={{ cursor: "pointer" }}>
        check CarbonInterface Authorization via Server
      </div>
      <div>CarbonInterface API Status: {carbonApiStatus.message}</div>
      <div onClick={() => getCar()} style={{ cursor: "pointer" }}>
        get Car
      </div>
      <div>{JSON.stringify(testResponse)}</div>
      {/* <div>{JSON.stringify(emissionStart)}</div> */}
    </>
  );
}

const SharesCake = styled.article`
  margin: 5vmin;
  width: 90vmin;
  height: 90vmin;
  background: #ddd;
  display: flex;
  /* flex-wrap: wrap; */
  /* flex-direction: column; */
  justify-content: center;
  align-items: flex-end;
  /* align-content: space-around; */
  position: relative;
`;

const SharesBox = styled.section`
  border: 1px solid #daa;
  background-color: #eee8e3;
  /* display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap; */
  position: absolute;
  cursor: zoom-out;
  width: 100%;
  height: 100%;
`;

const SharesSlice = styled.section`
  border: 1px solid #369;
  /* margin: 10px; */
  background-color: #acf5;
  display: flex;
  flex-direction: column;
  z-index: 10;
  cursor: zoom-in;
  /* overflow: hidden; */
  position: relative;
`;

const SliceText = styled.div`
  overflow: hidden;
`;

const Tooltip = styled.div`
  background-color: hsla(200, 35%, 45%, 0.9);
  border-radius: 0.25rem;
  color: #fff;
  font-size: 0.75rem;
  padding: 0.5rem;
  position: absolute;
  bottom: 100%;
  right: 0;
  p {
    margin: 0.25rem;
  }
`;

const TooltipBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  .tooltipText {
    opacity: 0;
    pointer-events: none;
  }
  :hover .tooltipText {
    opacity: 1;
  }
`;
export default App;
