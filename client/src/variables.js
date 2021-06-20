import powerplant from "./images/powerplant.png";

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
        text: "produzierende Industrie",
        unfccId: 8556,
        emission: 130100,
        style: {
          bgColor: "hsl(60, 50%,80%)",
          icon: "machine",
        },
      },
      {
        name: "transport",
        text: "Transport",
        unfccId: 8322,
        emission: 163600,
        style: {
          bgColor: "hsl(200, 50%,80%)",
          icon: "transport",
        },
      },
      {
        name: "energy_industries",
        text: "Energie-Industrie",
        unfccId: 10402,
        emission: 295200,
        style: {
          bgColor: "hsl(160, 50%,80%)",
          icon: "powerplant",
        },
      },
      {
        name: "combustion_heating_and_similar",
        text: "Öl/Gas-Heizung",
        unfccId: [9823, 10273],
        emission: 122800,
        style: {
          bgColor: "hsl(350, 50%,80%)",
          icon: "heating",
        },
      },
      {
        name: "industrial_processes",
        text: "Industrielle Prozesse",
        unfccId: 10393,
        emission: 64800,
        style: {
          bgColor: "hsl(310, 50%,80%)",
          icon: "processes",
        },
      },
      {
        name: "agriculture",
        text: "Landwirtschaft",
        unfccId: 10096,
        emission: 63600,
        style: {
          bgColor: "hsl(125, 50%,80%)",
          icon: "farm",
        },
      },
      {
        name: "other",
        text: "Abfall",
        emission: 18200,
        style: {
          bgColor: "hsl(200, 50%,80%)",
          icon: "other",
        },
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
    aviation_exterior: 60100000000, // calculated

    source:
      "Verkehrsleistung in Personenkilometern, Verkehr in Zahlen 2018, Bundesministerium für Verkehr",
  },
  transport: {
    car: {
      consumption: 7.4,
      source: "Verkehr in Zahlen 2018, Bundesministerium für Verkehr",
      Otto: { consumption: 7.8, kmPerYear: 10800 },
      Diesel: { consumption: 7.0, kmPerYear: 19500 },
      utilization: 1.5,
    },
    bus: {
      co2Per100km: 8, //Lininenbus 80 g/PKM, Fernbus 29g/Pkm
      utilization: 19, // fernbus 55
      source: "Umweltbundesamt, Tremod 6.03",
    },
    metro: {
      co2Per100km: 5.8,
      utilization: 19,
    },
    train: {
      co2Per100km: 3.2, // fern 32g/Pkm, nah 57 g/Pkm
      utilization: 56, // nah 28
    },
    aviation_exterior: {
      co2Per100km: 23, //nodata
      utilization: 71, //nodata
    },
    aviation_interior: {
      co2Per100km: 23,
      utilization: 71,
    },
  },
};

export const player = {
  individualCo2Emissions: 12.1935,
  averageCo2Emissions: (countryData.emissions * 1000) / countryData.population,
  unit: "Tonnen",
  origin: "Germany",
  transport: {
    car: {
      kmPerYear: countryData.personKm.car / countryData.population,
      consumption: 7.4, // liter
      carbonPer100km: 5.686, // kg
      co2Per100km: 20.85, // kg
      utilization: 1.5,
    },
    train: {
      kmPerYear: countryData.personKm.train / countryData.population,
    },
    bus: {
      kmPerYear: countryData.personKm.bus / countryData.population,
    },
    aviation_exterior: {
      kmPerYear:
        countryData.personKm.aviation_exterior / countryData.population,
    },
    aviation_interior: {
      kmPerYear:
        countryData.personKm.aviation_interior / countryData.population,
    },
  },
  goal: {
    emissions: 400.5,
    unit: "kg",
  },
};

export const conversions = {
  gasolineToCO2: 2.78, // eq kg/l
  dieselToCo2: 3.17, // eq kg/l
  electricityToCo2: 0.508, // kg/kWh brd mix 2016
  carbonToCo2: 44 / 12, // C + O2
};
