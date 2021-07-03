import axios from "axios";

function getUnitedNationsCountryData(req, res) {
  const { id, countryId, year } = req.params;
  const yearID = year - 1958;
  const unfccAdress = "https://di.unfccc.int/api/records/detail-by-category";
  axios
    .get(unfccAdress, {
      params: {
        partyIds: countryId, // 13 Germany
        yearIds: yearID,
        gasId: 10467,
        categoryId: id,
      },
    })
    .then((response) => res.json(response.data))
    .catch((error) => console.error(error));
}

function getUnitedNationsDetailData(req, res) {
  const { id, countryId } = req.params;
  const yearID = 2018 - 1958;
  const unfccAdress = "https://di.unfccc.int/api/records/detail-by-category";
  axios
    .get(unfccAdress, {
      params: {
        partyIds: countryId, // 13 Germany
        yearIds: yearID,
        gasId: 10467,

        categoryId: id,
      },
    })
    .then((response) => res.json(parseEmissionsDetails(response.data)))
    .catch((error) => console.error(error));
}

export { getUnitedNationsCountryData, getUnitedNationsDetailData };

function parseEmissionsDetails(responseData) {
  return {
    emissions: responseData.data[0].rows[0].cells[0].numberValue,
    categoryName: responseData.data[0].rows[0].name,
    country: responseData.data[0].name,
    year: responseData.columns[0].name,
  };
}
