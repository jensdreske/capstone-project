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

export const countryData = {
  countryName: "Germany",
  year: 2018,
  population: 83190556,
  units: "1000 Tonnen",
  emissions: 1014360,
  production: 794118,
  private: 220242,
  emissionsUnfcc: {
    country: "Germany",
    countryId: 13,
    year: 2018,
    total: 858368,
    emission: 858368,
    unfccId: 10464,
    unfccName: "Total GHG emissions without LULUCF",
    unfccIdSlices: 8677,
    unfccIdSlicesName: "Total GHG emissions without LULUCF",
    unit: "kt",
    slices: [
      {
        name: "manufactoring_industries",
        text: "Produzierende Industrie",
        unfccId: 8556,
        emission: 130100,
      },
      {
        name: "transport",
        text: "Transport",
        unfccId: 8322,
        emission: 163600,
      },
      {
        name: "energy_industries",
        text: "Energie-Industrie",
        unfccId: 10402,
        emission: 295200,
      },
      {
        name: "combustion_heating_and_similar",
        text: "Öl/Gas-Heizung",
        unfccId: [9823, 10273],
        emission: 122800,
      },
      {
        name: "industrial_processes",
        text: "Prozess Energie",
        unfccId: 10393,
        emission: 64800,
      },
      {
        name: "agriculture",
        text: "Landwirtschaft",
        unfccId: 10096,
        emission: 63600,
      },
      {
        name: "other",
        emission: 18200,
        slices: [
          {
            name: "fugitive_emissions_from_fuels",
            text: "flüchtige Emissionen",
            unfccId: 9374,
            emission: 8500,
          },
          {
            name: "waste_and_waste_water",
            text: "Abfall und Abwasser",
            unfccId: 10159,
            emission: 9700,
          },
        ],
      },
    ],
  },
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
    strassenverkehr: {
      emissions: 165625,
      private_haushalte: 110780,
      produktion: 54843,
      fossil: {
        emissions: 157565,
        private_haushalte: 105586,
        produktion: 51979,
        source: "statistisches Bundesamt, anthropogene luftemissionen, Tab 2.5",
      },
      bio: {
        emissions: 8058,
        private_haushalte: 5194,
        produktion: 2864,
        source: "statistisches Bundesamt, anthropogene luftemissionen, Tab 2.6",
      },
    },
  },
  personKm: {
    car: 913300000000, //913,3 mrd 2018 Verkehr in Zahlen
    train: 98200000000,
    bus: 80100000000,
    aviation_sum: 70400000000,
    aviation_interior: 10300000000,
    source:
      "Verkehrsleistung in Personenkilometern, Verkehr in Zahlen 2018, Bundesministerium für Verkehr",
  },
  car: {
    consumption: 7.4,
    source: "Verkehr in Zahlen 2018, Bundesministerium für Verkehr",
  },
};

export const player = {
  individualCo2Emissions: 10,
  averageCo2Emissions: (countryData.emissions * 1000) / countryData.population,
  unit: "Tonnen",
  origin: "Germany",
  transport: {
    car: {
      kmPerYear: countryData.personKm.car / countryData.population,
      consumption: 7.5, // liter
      carbonPer100km: 5.686, // kg
      co2Per100km: 20.85, // kg
    },
    train: {
      kmPerYear: countryData.personKm.train / countryData.population,
      co2Per100km: 0,
    },
    bus: {
      kmPerYear: countryData.personKm.bus / countryData.population,
      co2Per100km: 0,
    },
    aviation_sum: {
      kmPerYear: countryData.personKm.aviation_sum / countryData.population,
      co2Per100km: 0,
    },
    aviation_interior: {
      kmPerYear:
        countryData.personKm.aviation_interior / countryData.population,
      co2Per100km: 0,
    },
  },
};

export const conversions = {
  gasolineToCO2: 2.78, // eq kg/l
  dieselToCo2: 3.17, // eq kg/l
  electricityToCo2: 0.508, // kg/kWh brd mix 2016
  carbonToCo2: 44 / 12, // C + O2
};
