import express from "express";
import UserController from "../controllers/UserController";
import Validator from "../middlewares/validator";
import DataChecker from "../middlewares/DataChecker";
import { oktaAuthRequired } from "../middlewares/lib/oktaAuthRequired.js";

const router = express.Router();

router.get("/locked", (req, res) => {
  console.log("thanks OKTA");
  return res.status(200).json({
    messages: [
      {
        date: new Date(),
        text: "I AM LEGEND",
      },
      {
        date: new Date(new Date().getTime() - 1000 * 60 * 60),
        text: "BEEP BOOP BEEP BOOP!",
      },
    ],
  });
});

router.post(
  "/signup",
  Validator.accountRules(),
  Validator.validateInput,
  DataChecker.validateEmailNotExist,
  // oktaAuthRequired,
  UserController.signup
);
router.post(
  "/signin",
  Validator.accountRules(),
  Validator.validateInput,
  DataChecker.validateEmailExist,
  // oktaAuthRequired,
  UserController.signin
);
router.post(
  "/otpauth",
  DataChecker.validateEmailExist,
  // oktaAuthRequired,
  UserController.signinWithOtp
);

export default router;
