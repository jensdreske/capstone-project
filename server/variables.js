const player = {
  individualCo2Emissions: 0,
  averageCo2Emissions: 12.193,
  unit: "Tonnen",
  origin: "Germany",
};

const co2EmissionsByCountry = {
  country: "Germany",
  year: 2018,
  population: 83190556,
  units: "1000 Tonnen",
  emissions: 1014360,
  production: 794118,
  private: 220242,
  unfcc_data: {
    emissions: 831437,
    unfccId: 8677,
    energy: {
      emissions: 720284,
      unfccId: 8819,
      fuel_combustion: {
        emissions: 711758,
        unfccId: 9089,
        energy_industries: { emissions: 295192, unfccId: 10402 },
        manufactoring: { emissions: 130124, unfccId: 8556 },
        transport: {
          emissions: 163620,
          unfccId: 8322,
          road: { emissions: 157707, unfccId: 9607 },
        },
        residential: { emissions: 83694, unfccId: 9823 },
      },
    },
  },
  destatis_data: {
    strassen_verkehr: {
      emissions: 165625,
      private_haushalte: 110780,
      produktion: 54843,
      fossil: {
        emissions: 157567,
        private_haushalte: 105586,
        produktion: 51979,
      },
      bio: {
        emissions: 8058,
        private_haushalte: 5194,
        produktion: 2864,
      },
    },
  },
};

console.log(
  co2EmissionsByCountry.destatis_data.verkehr.fossil.emissions +
    co2EmissionsByCountry.destatis_data.verkehr.bio.emissions
);
