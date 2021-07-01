import express from "express";

import {
  checkAuthorization,
  getCarEstimate,
} from "../controller/carbonInterface.controller.js";

const router = express.Router();

router.get("/carboninterface/auth", checkAuthorization);
router.post("/carboninterface/getcar", getCarEstimate);

export default router;
