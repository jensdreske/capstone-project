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
      biologisch: {
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
      co2Per100km: 8, // Fernbus 29g/Pkm
      utilization: 19, // fernbus 55
      source: "Umweltbundesamt, Tremod 6.03",
      unit: "kg/100 PersonKilometer",
    },
    metro: {
      co2Per100km: 5.8,
      utilization: 19,
      unit: "kg/100 PersonKilometer",
      source: "Umweltbundesamt, Tremod 6.03",
    },
    train: {
      co2Per100km: 3.2, // fern 32g/Pkm, nah 57 g/Pkm
      utilization: 56, // nah 28
      unit: "kg/100 PersonKilometer",
      source: "Umweltbundesamt, Tremod 6.03",
    },
    aviation_exterior: {
      co2Per100km: 23,
      utilization: 71,
      unit: "kg/100 PersonKilometer",
      source: "no data yet, see aviation_interior",
    },
    aviation_interior: {
      co2Per100km: 23,
      utilization: 71,
      unit: "kg/100 PersonKilometer",
      source: "Umweltbundesamt, Tremod 6.03",
    },
  },
};

export const player = {
  individualCo2Emissions: 12.19321,
  averageCo2Emissions: (countryData.emissions * 1000) / countryData.population,
  unit: "Tonnen",
  origin: "Germany",
  transport: {
    car: {
      kmPerYear: countryData.personKm.car / countryData.population,
      consumption: 7.4,
      carbonPer100km: 5.686,
      co2Per100km: 20.85,
      utilization: 1.5,
      units: {
        consumption: "l",
        carbonPer100km: "kg",
        co2Per100km: "kg",
        utilization: "person per car",
      },
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
    emissions: 0,
    unit: "kg",
  },
  savingsInPercent: 0,
};

export const conversions = {
  gasolineToCO2: 2.78,
  dieselToCo2: 3.17,
  electricityToCo2: 0.508,
  carbonToCo2: 44 / 12,
  units: {
    gasolineToCO2: "kg/l",
    dieselToCo2: "kg/l",
    electricityToCo2: "kg/kWh, German Energy Mix 2016",
    carbonToCo2: "Molar mass ratio",
  },
};

export const goals = {
  customGoals: {},
  tourism: {
    units: "kg CO2 equivalents",
    source:
      "Der touristische Klima-Fußabdruck, World Wide Fund for Nature (WWF), 2009",
    mexico: {
      emissionsPerPerson: 7218,
      people: 2,
      shares: {
        transportation: 6361,
        accommodation: 487,
        catering: 205,
        activities: 165,
      },
      location: "Mexico",
      region: "North America",
      duration: "2 weeks",
    },
    mallorca: {
      emissionsPerPerson: 1221,
      people: 3,
      shares: {
        transportation: 925,
        accommodation: 148,
        catering: 91,
        activities: 58,
      },
      location: "Mallorca",
      region: "Mediterranean Sea",
      duration: "2 weeks",
    },

    cruiseShip: {
      emissionsPerPerson: 1224,
      people: 2,
      shares: {
        transportation: 685,
        accommodation: 439,
        catering: 79,
        activities: 21,
      },
      location: "Ship Cruise",
      region: "Mediterranean Sea",
      duration: "1 week",
    },
    balticSea: {
      emissionsPerPerson: 258,
      people: 4,
      shares: {
        transportation: 80,
        accommodation: 52,
        catering: 56,
        activities: 70,
      },
      location: "Baltic Sea",
      region: "Germany",
      duration: "2 weeks",
    },
    stayHome: {
      emissionsPerPerson: 58,
      people: 4,
      shares: {
        transportation: 0,
        accommodation: 17,
        catering: 9,
        activities: 33,
      },
      location: "balcony",
      region: "at home",
      duration: "2 weeks",
    },
  },
};
