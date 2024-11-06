const express=require("express");
const { registerUser, loginUser, logoutUser, forgotPass, resetPassword, loadUser, verifyEmail, applyLoan, getLoans, searchLoans, getAssessments } = require("../controller/userController");
const { isAuthenticated } = require("../middleware/auth");
const { uploadImageFile }=require("../middleware/upload")

const router=express.Router();

router.route("/register").post(uploadImageFile, registerUser);
router.route("/verify-email").post(verifyEmail);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/forgotPass").post(forgotPass)
router.route("/resetPass/:token").post(resetPassword)
router.route("/me").get(isAuthenticated, loadUser);
router.route("/me/assessments").post(isAuthenticated, getAssessments);

module.exports=router;