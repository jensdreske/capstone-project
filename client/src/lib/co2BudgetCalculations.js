const co2BudgetLeft = {
  "1.5 degree": 4.2,
  "1.75 degree": 6.7,
  units: "Gigatons",
  source:
    "Umweltgutachten 2020, Kapitel 2 Pariser Klimaziele, Sachverständigenrat für Umweltfragen",
};

function compareUnitedNationsToGermanCalculation(countryData) {
  return countryData.emissionsUnfcc.emission / countryData.emissions;
}

function calculateGermanEmissionsIfAllWouldActLikePlayer(
  individualCo2Emissions,
  population
) {
  const tonsToGigaTonsFactor = Math.pow(10, 9);
  return (individualCo2Emissions * population) / tonsToGigaTonsFactor;
}

function calculateGameEnd(playerScore, countryData, temperatureRise) {
  const co2BudgetCalculationStartYear = 2020;
  const progressiveLinearReductionFactor = 2;

  const yearOfExit =
    co2BudgetCalculationStartYear +
    (progressiveLinearReductionFactor * co2BudgetLeft[temperatureRise]) /
      (compareUnitedNationsToGermanCalculation(countryData) *
        calculateGermanEmissionsIfAllWouldActLikePlayer(
          playerScore.individualCo2Emissions,
          countryData.population
        ));
  return yearOfExit;
}

export { calculateGameEnd };
