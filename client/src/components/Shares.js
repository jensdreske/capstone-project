import { useState } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import { roundPlaces } from "../lib/roundPlaces.js";

import machine from "../images/machine.png";
import powerplant from "../images/powerplant.png";
import transports from "../images/transport@2x.png";
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

function getSliceByCakePercentage(slice, cake) {
  const percentage = (slice / cake) * 100;
  return percentage;
}

function translatePercentageToSquareboxXY(slice, cake) {
  const percentage = getSliceByCakePercentage(slice, cake);
  const XandY = Math.sqrt(percentage * 100);
  return XandY;
}

export default function Shares({ shares }) {
  const [infoVisible, setInfoVisible] = useState([]);

  shares.slices.forEach((slice) => {
    slice.percentage = getSliceByCakePercentage(
      slice.emission,
      shares.emission
    );
    slice.square = translatePercentageToSquareboxXY(
      slice.emission,
      shares.emission
    );
  });

  function setInfo(index) {
    const newSetInfo = [];
    newSetInfo[index] = !infoVisible[index];
    setInfoVisible([...newSetInfo]);
  }

  return (
    <>
      <SharesCake>
        {shares.slices.map((slice, index) => {
          return (
            <SharesSlice
              key={index + slice.name}
              style={{
                height: `${slice.square * 0.8}vmin`,
                width: `${slice.square * 0.8}vmin`,
                background: `${slice.style.bgColor}`,
              }}
            >
              <NavLinkSlice to={"/" + slice.name}>
                <img src={icons[slice.style.icon]} alt="to share" />
                <SliceText show={infoVisible[index]}>
                  <p>{slice.text}</p>
                  <p>{roundPlaces(slice.percentage, 2)}%</p>
                  <p>{slice.emission} kt CO2</p>
                </SliceText>
              </NavLinkSlice>

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
  margin: 1rem 5vmin 6rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
  position: relative;
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
  align-self: self-start;
  background-color: #fffd;
  border-radius: 6px;
  min-height: 90%;
  min-width: 90%;
  overflow: scroll;
  padding: 0.5rem;
  position: absolute;
  right: 5%;
  top: 5%;
  white-space: nowrap;

  ${(props) =>
    props.show
      ? {
          opacity: "90%",
          backdropFilter: "blur(3px)",
          transition: "opacity 0.5s, backdrop-filter 0.5s",
        }
      : {
          opacity: "0%",
          backdropFilter: "blur(0px)",
          transition: "opacity 2s, backdrop-filter 2s",
        }};
`;

const NavLinkSlice = styled(NavLink)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
