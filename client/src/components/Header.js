import styled from "styled-components";

import earth from "../images/earth.png";
import cloud from "../images/cloud_m.png";
import cloudlet from "../images/cloud_s.png";
import coalculator from "../images/coalculator.png";

export default function Header() {
  return (
    <HeaderBox>
      <LogoBox>
        <img className="cloud" src={cloud} alt="cloud" />
        <img className="earth" src={earth} alt="earth" />
        <img className="coalculator" src={coalculator} alt="coalculator" />
        <img className="cloudlet" src={cloudlet} alt="cloudlet" />
      </LogoBox>
    </HeaderBox>
  );
}

const LogoBox = styled.section`
  position: relative;
  height: 6rem;
  width: 9rem;
  /* border: 1px solid red; */
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
  margin: 1rem;
  position: fixed;
  top: 0;
  width: 66%;
`;
