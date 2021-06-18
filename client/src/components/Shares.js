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

const icons = {
  machine: machine,
  powerplant: powerplant,
  transport: transports,
  heating: house,
  processes: processes,
  farm: tractor,
  other: waste,
};
export default function Shares({ shares }) {
  shares.slices.forEach((slice) => {
    slice.percentage = (slice.emission / shares.emission) * 100;
    // coefficient 100 = sqrt(parent box area) e.g. % of parent's area to cover:
    slice.square = Math.sqrt(slice.percentage * 66);
  });
  return (
    <>
      <SharesCake>
        {/* <SharesBox>
          <p>{shares.country}</p>
          <p>{shares.year}</p>
          <p>{shares.total} kt CO2</p>
        </SharesBox> */}
        {shares.slices.map((slice, index) => {
          console.log();
          return (
            <SharesSlice
              key={index + slice.name}
              style={{
                height: `${slice.square}%`,
                width: `${slice.square}%`,
                background: `${slice.style.bgColor}`,
              }}
            >
              {/* <SliceText>
                <p>{slice.text}</p>
              </SliceText> */}

              <NavLinkTooltip to={"/" + slice.name}>
                <img src={icons[slice.style.icon]} />
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
    </>
  );
}

const SharesCake = styled.article`
  margin: 5vmin;
  width: 90vmin;
  height: 90vmin;
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
    width: 70%;
  }
`;

const SliceText = styled.div`
  overflow: hidden;
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
