import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

import earth from "../images/earth.png";
import cloud from "../images/cloud_m.png";
import cloudlet from "../images/cloud_s.png";
import coalculator from "../images/coalculator.png";

export default function Header({ setScoreScrollPosition }) {
  return (
    <HeaderBox>
      <LogoBox>
        <NavLink to="/" onClick={() => setScoreScrollPosition(2)}>
          <img
            className="cloud"
            src={cloud}
            alt="cloud"
            width="77"
            height="77"
          />
          <img
            className="earth"
            src={earth}
            alt="earth"
            width="82"
            height="82"
          />
          <img
            className="coalculator"
            src={coalculator}
            alt="coalculator"
            width="83"
            height="24"
          />
          <img
            className="cloudlet"
            src={cloudlet}
            alt="cloudlet"
            width="39"
            height="39"
          />
        </NavLink>
      </LogoBox>
    </HeaderBox>
  );
}

const LogoBox = styled.section`
  position: relative;
  height: 6rem;
  width: 9rem;
  text-align: left;
  img {
    position: absolute;
  }
  .cloud {
    height: 80%;
  }
  .earth {
    left: 30%;
    top: 15%;
    height: 85%;
  }
  .cloudlet {
    left: 72.5%;
    top: 10%;
    height: 40%;
  }
  .coalculator {
    top: 33%;
    left: 15%;
    height: 25%;
  }
`;

const HeaderBox = styled.header`
  display: grid;
  place-content: center;
  margin: 1rem 1rem;
  position: fixed;
  top: 0;
  width: 66%;
  z-index: -1;
`;
