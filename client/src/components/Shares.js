import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import { roundPlaces } from "../lib/roundPlaces.js";

import machine from "../images/machine@2x.png";
import powerplant from "../images/powerplant@2x.png";
import transports from "../images/transport@2x.png";
import processes from "../images/chemistry@2x.png";
import tractor from "../images/tractor@2x.png";
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

function translatePercentageToSquareboxXY(slice, cake, screenSize) {
  const percentage = getSliceByCakePercentage(slice, cake);
  const XandY =
    (Math.sqrt(percentage) *
      Math.max(screenSize.windowWidth, screenSize.windowHeight)) /
    24;
  return XandY;
}

export default function Shares({ shares, countryData }) {
  const [infoVisible, setInfoVisible] = useState([]);
  const [screenSize, setScreenSize] = useState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setScreenSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const handleResize = (e) => {
  //   setScreenSize({ windowWidth: window.innerWidth });
  //  };

  //  componentDidMount() {
  //   window.addEventListener("resize", this.handleResize);
  //  }

  //  componentWillUnMount() {
  //   window.addEventListener("resize", this.handleResize);
  //  }

  shares.slices.forEach((slice) => {
    slice.percentage = getSliceByCakePercentage(
      slice.emission,
      shares.emission
    );
    slice.square = translatePercentageToSquareboxXY(
      slice.emission,
      shares.emission,
      screenSize
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
                height: `${slice.square}px`,
                width: `${slice.square}px`,
                background: `${slice.style.bgColor}`,
              }}
            >
              <NavLinkSlice to={"/" + slice.name}>
                <img src={icons[slice.style.icon]} alt="to share" />
                <SliceText show={infoVisible[index]}>
                  <p>{slice.text}</p>
                  <p>{roundPlaces(slice.percentage, 2)}%</p>
                  <p>{roundPlaces(slice.emission / 1000)} Mt CO2</p>
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
        <CountryData>
          <p>{countryData.countryName}:</p>
          <p> {roundPlaces(countryData.emissions / 1000)} Mt CO2</p>
        </CountryData>
      </SharesCake>
    </>
  );
}

const SharesCake = styled.article`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
  border-radius: 2.5rem;
  border: 4px solid #fff8;
  backdrop-filter: brightness(1.1) blur(5px);
  padding: 0.5rem 0.25rem;
  width: 100%;
  max-width: 900px;
`;

const SharesSlice = styled.section`
  border: var(--borderLine);
  border-radius: var(--boxRadius);
  margin: 4px;
  background-color: hsl(220, 100%, 85%);
  font-size: 0.8rem;
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
  background-color: hsl(190, 30%, 90%, 0.7);
  border-radius: 6px;
  min-height: 90%;
  width: 90%;
  min-width: 110px;
  overflow: scroll;
  padding: 0.5rem;
  position: absolute;
  right: 5%;
  top: 5%;
  font-weight: 600;
  border: 2px solid #fffa;
  /* color: hsl(230, 15%, 30%); */
  /* white-space: nowrap; */

  ${(props) =>
    props.show
      ? {
          opacity: "90%",
          backdropFilter: "blur(5px)",
          transition: "opacity 0.5s ease-out, backdrop-filter 0.5s",
        }
      : {
          opacity: "0%",
          backdropFilter: "blur(0px)",
          transition: "opacity 2s, backdrop-filter 2s",
        }}
`;

const NavLinkSlice = styled(NavLink)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CountryData = styled.section`
  color: #fffc;
  font-weight: 600;
`;
