import express, { response } from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// save on monthly limits
const ENABLE_CARBON_REQUESTS = false;
const carbonInterfaceKey = process.env.CARBONINTERFACE_TOKEN;

const server = express();

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => res.json("Server is up and running!"));

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

server.get("/carboninterface/auth", (req, res) => {
  const options = parseCarbonInterfaceRequest("get", "/auth");
  axios(options)
    .then(function (response) {
      console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.json(error);
    })
    .then(function () {
      // always executed
    });
});

server.post("/carboninterface/getcar", (req, res) => {
  const carOptions = parseCarbonInterfaceRequest(
    "post",
    "/estimates",
    req.body
  );
  if (ENABLE_CARBON_REQUESTS) {
    axios(carOptions)
      .then(function (response) {
        // console.log(response.data);
        res.json(response.data);
      })
      .catch(function (error) {
        console.log(error);
        res.json(error);
      });
  } else {
    const errorMessage =
      "CarbonInterfaceAPI Requests are disabled to prevent reaching the monthly limit";
    console.log(errorMessage);
    res.json(errorMessage);
  }
});

server.get("/unfcc/getemissions/:id/:countryId/:year", (req, res) => {
  const { id, countryId, year } = req.params;
  const yearID = year - 1958;
  console.log(id);
  const unfccAdress = "https://di.unfccc.int/api/records/detail-by-category";
  axios
    .get(unfccAdress, {
      params: {
        partyIds: countryId, // 13 Germany
        yearIds: yearID,
        gasId: 10467,

        categoryId: id,
        // categoryId: 9089, //fuel sectoral
        // categoryId: 10402, //fuel sectoral

        // categoryId: 10464,
      },
    })
    .then((response) => res.json(response.data))
    .catch((error) => console.error(error));
});

server.listen(4000);
