import express from "express";

import {
  getCustomGoals,
  getCustomGoalById,
  postCustomGoal,
  updateCustomGoal,
  deleteCustomGoal,
} from "../controller/customGoals.controller.js";

const router = express.Router();

router.get("/customgoals", getCustomGoals);
router.get("/customgoals/:customGoalId", getCustomGoalById);
router.post("/customgoals", postCustomGoal);
router.put("/customgoals/:customGoalId", updateCustomGoal);
router.delete("/customgoals/:customGoalId", deleteCustomGoal);

export default router;
