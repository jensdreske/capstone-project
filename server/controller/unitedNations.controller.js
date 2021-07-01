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

export { getUnitedNationsCountryData };
