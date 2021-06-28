import CustomGoal from "../models/goal.model.js";

function getCustomGoals(req, res) {
  CustomGoal.find().then((goals) => res.json(goals));
}

function getCustomGoalById(req, res) {
  const { customGoalId } = req.params;
  CustomGoal.findById(customGoalId)
    .then((goal) => res.json(goal))
    .catch((error) => {
      res.status(404).json({
        message:
          error.name +
          ": check your goal's Id. '" +
          customGoalId +
          "' not found",
      });
    });
}

function postCustomGoal(req, res) {
  const exampleGoal = new CustomGoal({
    name: req.body.name,
    description: req.body.description,
    co2InKgPerUnit: req.body.co2InKgPerUnit,
    image: req.body.image,
    userName: req.body.userName,
    verified: false,
  });
  exampleGoal
    .save()
    .then((goalSaved) => res.json(goalSaved))
    .catch((error) => res.json(error));
}

function updateCustomGoal(req, res) {
  const { customGoalId } = req.params;
  const updatedGoal = req.body;

  CustomGoal.findByIdAndUpdate(
    { _id: customGoalId },
    updatedGoal,
    (error, doc) => {
      if (error) {
        res.json({ message: error });
        return;
      }
      res.json(doc);
    }
  );
}

function deleteCustomGoal(req, res) {
  const { customGoalId } = req.params;
  CustomGoal.findByIdAndDelete({ _id: customGoalId }, (error, doc) =>
    res.json({
      succes: true,
      message: `The custom goal ${doc.name} has been deleted.`,
      data: doc,
    })
  );
}

export {
  getCustomGoals,
  getCustomGoalById,
  postCustomGoal,
  updateCustomGoal,
  deleteCustomGoal,
};
