import styled from "styled-components/macro";

import yucatan from "../images/travels/mexico-1032966_2.jpeg";
import cruiseShip from "../images/travels/ferry-boat-123059.jpeg";
import mallorca from "../images/travels/summer-2519545.jpeg";
import balticseaImage from "../images/travels/house-4028391.jpeg";

import checkmark from "../images/checkmark@2x.png";

const travelImages = {
  mexico: yucatan,
  mallorca: mallorca,
  cruiseShip: cruiseShip,
  balticSea: balticseaImage,
};

export default function GoalTravelItem({
  goals,
  destination,
  emissionsFromGoals,
  addEmissionsFromTourism,
}) {
  return (
    <ListItemBox>
      <TravelIcon
        src={travelImages[destination]}
        alt=""
        height="50"
        width="75"
      />
      <TravelText>
        <TravelTitle>{goals.tourism[destination].location}</TravelTitle>
        <p className="smalltext">{goals.tourism[destination].region}</p>
      </TravelText>
      <CheckBox
        data-test-id="preset-goal-checkbox"
        onClick={() => {
          addEmissionsFromTourism(destination);
        }}
      >
        {emissionsFromGoals &&
          Object.keys(emissionsFromGoals).includes(destination) && (
            <img src={checkmark} alt="check" heigth="30" width="30" />
          )}
      </CheckBox>
    </ListItemBox>
  );
}

const ListItemBox = styled.section`
  align-items: center;
  background: var(--backgroundBright);
  border-radius: var(--boxRadius);
  border: var(--borderLine);
  display: flex;
  justify-content: space-between;
  margin: 0.25rem 0;
  max-width: 30rem;
  padding: 0.25rem;
  width: 100%;
`;

const TravelIcon = styled.img`
  border-radius: 5px;
`;

const TravelText = styled.section`
  flex-grow: 1;
  text-align: left;
  padding-left: 0.5rem;
`;

const TravelTitle = styled.p`
  font-weight: 500;
  font-size: 1.25rem;
`;

const CheckBox = styled.button`
  height: 2.5rem;
  width: 2.5rem;
  border: var(--borderLine);
  border-radius: var(--boxRadius);
  background-color: var(--backgroundBright);
  margin-right: 0.25rem;
`;
