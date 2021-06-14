export const startShares = {
  // quelle UBA 2020_thg_crf_plus_1a_details_ci
  // entspricht UNFCC
  country: "Germany",
  year: 2018,
  total: 858000,

  name: "sum",
  emission: 858000,

  slices: [
    {
      name: "manufactoring_industries",
      text: "Produzierende Industrie",
      emission: 130100,
    },
    {
      name: "transport",
      text: "Transport",
      emission: 163600,
    },
    {
      name: "energy_industries",
      text: "Energie-Industrie",
      emission: 295200,
    },
    {
      name: "combustion_heating_and_similar",
      text: "Öl/Gas-Heizung",
      emission: 122800,
    },
    {
      name: "industrial_processes",
      text: "Prozess Energie",
      emission: 64800,
    },
    {
      name: "agriculture",
      text: "Landwirtschaft",
      emission: 63600,
    },
    {
      name: "other",
      emission: 18200,
      slices: [
        {
          name: "fugitive_emissions_from_fuels",
          text: "flüchtige Emissionen",
          emission: 8500,
        },
        {
          name: "waste_and_waste_water",
          text: "Abfall und Abwasser",
          emission: 9700,
        },
      ],
    },
  ],
};

export const player = {
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

// console.log(
//   co2EmissionsByCountry.destatis_data.verkehr.fossil.emissions +
//     co2EmissionsByCountry.destatis_data.verkehr.bio.emissions
// );

export const shares = {
  country: "Germany",
  year: 2018,
  total: [858000],
  slices: [
    {
      name: "total",
      emission: 7209000,
      percentage: 100,
      percentageOfTotal: 100,
    },
    {
      name: "energy",
      emission: 7209000,
      percentage: 84,
      percentageOfTotal: 84,
    },
    {
      name: "industry",
      emission: 64000,
      percentage: 8,
      percentageOfTotal: 8,
    },
    {
      name: "agriculture",
      emission: 63000,
      percentage: 7,
      percentageOfTotal: 7,
    },
    { name: "waste", emission: 9000, percentage: 1, percentageOfTotal: 1 },
    { name: "other", emission: 0, percentage: 0, percentageOfTotal: 0 },
  ],
};
