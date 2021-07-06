import express from "express";

import {
  getUnitedNationsCountryData,
  getUnitedNationsDetailData,
} from "../controller/unitedNations.controller.js";

const router = express.Router();

router.get(
  "/unfcc/getemissions/:id/:countryId/:year",
  getUnitedNationsCountryData
);

router.get(
  "/unfcc/get_share_emissions/:id/:countryId",
  getUnitedNationsDetailData
);

export default router;
