import styled from "styled-components/macro";
import { roundPlaces } from "../lib/roundPlaces.js";
import { Switch, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Shares({ shares }) {
  shares.slices.forEach((slice) => {
    slice.percentage = (slice.emission / shares.emission) * 100;
    // coefficient 100 = sqrt(parent box area) e.g. % of parent's area to cover:
    slice.square = Math.sqrt(slice.percentage * 66);
  });
  return (
    <Switch>
      <Route path="/">
        <SharesCake>
          <SharesBox>
            <p>{shares.country}</p>
            <p>{shares.year}</p>
            <p>{shares.total} kt CO2</p>
          </SharesBox>
          {shares.slices.map((slice, index) => {
            return (
              <SharesSlice
                key={index + slice.name}
                style={{
                  height: `${slice.square}%`,
                  width: `${slice.square}%`,
                }}
              >
                <SliceText>
                  <p>{slice.text}</p>
                </SliceText>

                <NavLinkTooltip to={"/" + slice.name}>
                  <Tooltip className="tooltipText">
                    <p>{slice.text}</p>
                    <p>{roundPlaces(slice.percentage, 2)}%</p>
                    <p>{slice.emission} kt CO2</p>
                  </Tooltip>
                </NavLinkTooltip>
              </SharesSlice>
            );
          })}
        </SharesCake>
        <NavLink to={"/dev"}>Devs Playground</NavLink>
      </Route>
    </Switch>
  );
}

function parseUncffName(str) {
  const newstr = str.split(" - ")[0].split(" ").slice(1);
  return newstr.reduce((acc, curr) => acc + " " + curr, " ");
}

export function SharesUnfcc({ shares, getBack, getEmissions }) {
  console.log(shares);
  return (
    <SharesCake>
      {shares.slices.map((slice, index) => {
        if (index === 0) {
          return (
            <SharesBox
              key={slice.id}
              onClick={() => getBack()}
              style={{ width: slice.percentage + "%", height: "100%" }}
            >
              {Math.round(slice.percentageOfTotal)}% {slice.name} (id {slice.id}
              )
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
  );
}

const SharesCake = styled.article`
  margin: 5vmin;
  width: 90vmin;
  height: 90vmin;
  background: #ddd;
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: column; */
  justify-content: center;
  align-content: center;
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
  margin: 1px;
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

const NavLinkTooltip = styled(NavLink)`
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
