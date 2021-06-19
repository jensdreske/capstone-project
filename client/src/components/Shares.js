import { useState } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import { roundPlaces } from "../lib/roundPlaces.js";

import machine from "../images/machine.png";
import powerplant from "../images/powerplant.png";
import car from "../images/car.png";
import transports from "../images/transport@2x.png";
import house from "../images/house.png";
import processes from "../images/chemistry.png";
import tractor from "../images/tractor.png";
import waste from "../images/waste.png";
import heating from "../images/heating@2x.png";

import info from "../images/info_s@2x.png";

const icons = {
  machine: machine,
  powerplant: powerplant,
  transport: transports,
  heating: heating,
  processes: processes,
  farm: tractor,
  other: waste,
};
export default function Shares({ shares }) {
  shares.slices.forEach((slice) => {
    slice.percentage = (slice.emission / shares.emission) * 100;
    // coefficient 100 = sqrt(parent box area) e.g. % of parent's area to cover:
    slice.square = Math.sqrt(slice.percentage * 50);
  });
  const [infoVisible, setInfoVisible] = useState([]);

  return (
    <>
      <SharesCake>
        {/* <SharesBox>
          <p>{shares.country}</p>
          <p>{shares.year}</p>
          <p>{shares.total} kt CO2</p>
        </SharesBox> */}
        {shares.slices.map((slice, index) => {
          function setInfo(index) {
            const newSetInfo = [];
            newSetInfo[index] = !infoVisible[index];
            setInfoVisible([...newSetInfo]);

            // console.log(newSetInfo);
          }
          return (
            <SharesSlice
              key={index + slice.name}
              style={{
                height: `${slice.square}vmin`,
                width: `${slice.square}vmin`,
                background: `${slice.style.bgColor}`,
              }}
            >
              <NavLinkTooltip to={"/" + slice.name}>
                <img src={icons[slice.style.icon]} />
                <Tooltip className="tooltipText">
                  <p>{roundPlaces(slice.percentage, 2)}%</p>
                  <p>{slice.text}</p>
                  <p>{slice.emission} kt CO2</p>
                </Tooltip>
                <SliceText className={infoVisible[index] ? "show" : "hide"}>
                  <p>{slice.text}</p>
                  <p>{roundPlaces(slice.percentage, 2)}%</p>
                  <p>{slice.emission} kt CO2</p>
                </SliceText>
              </NavLinkTooltip>

              <img
                onClick={() => setInfo(index)}
                className="infoIcon"
                src={info}
                alt="info"
              />
            </SharesSlice>
          );
        })}
      </SharesCake>
    </>
  );
}

const SharesCake = styled.article`
  margin: 8rem 5vmin 6rem;
  /* margin-bottom: 6rem; */
  /* width: 90vmin;
  height: 90vmin; */
  /* background: #ddd; */
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: column; */
  justify-content: center;
  /* align-content: center; */
  align-items: flex-end;
  /* align-content: space-around; */
  position: relative;
`;

const SharesBox = styled.section`
  /* color: white; */
  /* border: 1px solid #daa;
  background-color: #eee8e3;
  position: absolute;
  cursor: zoom-out;
  width: 100%;
  height: 100%; */

  /* display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap; */
`;

const SharesSlice = styled.section`
  border: 2px solid black;
  border-radius: 6px;
  margin: 4px;
  background-color: hsl(220, 100%, 85%);
  font-size: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  z-index: 10;
  cursor: zoom-in;
  /* overflow: hidden; */
  position: relative;
  img {
    height: 70%;
  }
  .infoIcon {
    height: 1rem;
    position: absolute;
    top: -1px;
    right: -1px;
  }
`;

const SliceText = styled.div`
  overflow: scroll;
  background-color: #fffd;
  padding: 0.5rem;
  border-radius: 6px;
  position: absolute;
  align-self: self-start;
  min-width: 90%;
  min-height: 90%;
  right: 5%;
  top: 5%;

  white-space: nowrap;
`;

const Tooltip = styled.div`
  background-color: #fffd;
  border-radius: 0.25rem;
  color: #fff;

  padding: 0.25em;
  position: absolute;
  bottom: 102%;

  min-width: 4rem;
  p {
    margin: 0.25rem;
  }
`;

const NavLinkTooltip = styled(NavLink)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .tooltipText {
    opacity: 0;
    pointer-events: none;
  }
  :hover .tooltipText {
    opacity: 1;
  }
  .hide {
    opacity: 0%;
    backdrop-filter: blur(0px);
    transition: opacity 2s, backdrop-filter 2s;
  }
  .show {
    opacity: 90%;
    backdrop-filter: blur(3px);
    transition: opacity 0.5s, backdrop-filter 0.5s;
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

export { SharesCake, SharesBox, SharesSlice, SliceText, TooltipBox, Tooltip };
