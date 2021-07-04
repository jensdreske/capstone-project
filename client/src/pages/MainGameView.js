import Shares from "../components/Shares";

export default function MainGameView({ countryEmissions, countryData }) {
  return <Shares shares={countryEmissions} countryData={countryData} />;
}
