const validateCo2Emissions = (co2Emission) =>
  isFinite(co2Emission) && co2Emission > 0;
const validateName = (goalName) => goalName.length >= 1;

const validateGoal = (goal) =>
  validateCo2Emissions(goal.goalCo2Emission) && validateName(goal.goalName);

export default validateGoal;
