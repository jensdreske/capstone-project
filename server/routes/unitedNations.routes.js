import express from "express";

import { getUnitedNationsCountryData } from "../controller/unitedNations.controller.js";

const router = express.Router();

router.get(
  "/unfcc/getemissions/:id/:countryId/:year",
  getUnitedNationsCountryData
);

export default router;
