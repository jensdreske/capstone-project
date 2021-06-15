import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { roundPlaces } from "../lib/roundPlaces.js";
import {
  SharesCake,
  SharesBox,
  SharesSlice,
  SliceText,
  TooltipBox,
  Tooltip,
} from "./Shares";

function parseUncffName(str) {
  const newstr = str.split(" - ")[0].split(" ").slice(1);
  return newstr.reduce((acc, curr) => acc + " " + curr, " ");
}

export function SharesUnfcc({ shares }) {
  console.log(shares);
  const [emissionsUncff, setemissionsUncff] = useState(shares);
  const [emissionHistory, setEmissionHistory] = useState([]);
  useEffect(() => {
    getEmissions();
  }, []);

  function getEmissions(unfccId = 8677) {
    fetch(`http://localhost:4000/unfcc/getemissions/${unfccId}/13/2018`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        emissionsUncff.country = res.data[0].name;
        emissionsUncff.year = res.columns[0].name;
        emissionsUncff.yearId = res.data[0].name;
        emissionsUncff.slices = [];
        for (let i = 0; i < res.data[0].rows.length; i++) {
          if (res.data[0].rows[i].id !== 8533) {
            emissionsUncff.slices[i] = {
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
                ? (res.data[0].rows[i].cells[0].numberValue /
                    emissionsUncff.total) *
                  100
                : 0,
            };
          }
        }
        setemissionsUncff(emissionsUncff);
        const history = emissionHistory.slice(0, 12);
        setEmissionHistory([unfccId, ...history]);
        console.log(emissionsUncff);
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
      <SharesCake>
        {emissionsUncff.slices.map((slice, index) => {
          if (index === 0) {
            return (
              <SharesBox
                key={slice.id}
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
      </SharesCake>

      {/* <div onClick={() => getEmissions()} style={{ cursor: "pointer" }}>
        get German co2 data for 2018 via server
      </div> */}
      {/* <div onClick={() => getBack()} style={{ cursor: "pointer" }}>
              BACK
            </div> */}
      {/* <div>{JSON.stringify(emissionsUncff)}</div> */}
    </>
  );
}
