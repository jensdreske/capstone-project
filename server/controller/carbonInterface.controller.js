import axios from "axios";

// save on monthly limits
const ENABLE_CARBON_REQUESTS = false;
const carbonInterfaceKey = process.env.CARBONINTERFACE_TOKEN;

function parseCarbonInterfaceRequest(method, path, data = null) {
  const carbonInterfaceHeaders = {
    headers: {
      Authorization: carbonInterfaceKey,
      Host: "www.carboninterface.com",
    },
  };
  let carbonRequest = {
    method: method,
    url: "https://carboninterface.com/api/v1" + path,
    ...carbonInterfaceHeaders,
  };
  if (data) carbonRequest = { ...carbonRequest, data: data };

  return carbonRequest;
}

function checkAuthorization(req, res) {
  const options = parseCarbonInterfaceRequest("get", "/auth");
  axios(options)
    .then((response) => res.json(response.data))
    .catch((error) => res.json(error));
}

function getCarEstimate(req, res) {
  const carOptions = parseCarbonInterfaceRequest(
    "post",
    "/estimates",
    req.body
  );
  if (ENABLE_CARBON_REQUESTS) {
    axios(carOptions)
      .then((response) => res.json(response.data))
      .catch((error) => res.json(error));
  } else {
    const errorMessage =
      "CarbonInterfaceAPI Requests are disabled to prevent reaching the monthly limit";
    console.log(errorMessage);
    res.json(errorMessage);
  }
}

export { checkAuthorization, getCarEstimate };
