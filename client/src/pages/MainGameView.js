import Shares from "../components/Shares";

export default function MainGameView({ countryEmissions }) {
  return <Shares shares={countryEmissions} />;
}
