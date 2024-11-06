const express=require("express");
const { isAuthenticated } = require("../middleware/auth");
const { createAssessment, submitAnswer, getScore } = require("../controller/stressController");

const assessRouter=express.Router();

assessRouter.route('/start-assessment').post(isAuthenticated, createAssessment);
assessRouter.route('/submit-answer').post(isAuthenticated, submitAnswer);
assessRouter.route('/get-score/:assessmentId').post(isAuthenticated, getScore);

module.exports=assessRouter;