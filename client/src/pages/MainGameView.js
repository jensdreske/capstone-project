import Shares from "../components/Shares";

export default function MainGameView({ countryEmissions, countryData }) {
  return (
    <Shares countryEmissions={countryEmissions} countryData={countryData} />
  );
}
