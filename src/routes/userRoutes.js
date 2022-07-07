import express from "express";
import UserController from "../controllers/UserController";
import Validator from "../middlewares/validator";
import DataChecker from "../middlewares/DataChecker";
import { oktaAuthRequired } from "../middlewares/lib/oktaAuthRequired.js";
import verifyAccess from "../middlewares/verifyAccess";
import verifyToken from "../middlewares/verifyToken";
const router = express.Router();

// Admin Apis
router.get(
  "/all",
  verifyToken,
  // verifyAccess("admin"),
  UserController.getAllUsers
);

router.patch(
  "/verify/:id",
  verifyToken,
  verifyAccess("admin"),
  UserController.updateUser
);

router.get(
  "/profile",
  verifyToken,
  // verifyAccess("admin"),
  UserController.getMyProfile
);

// normal Apis

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
  "/email",
  DataChecker.validateEmailExist,
  UserController.respondEmailExist
);

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

router.post(
  "/createidentity",
  verifyToken,
  verifyAccess("user"),
  UserController.createIdentity
);

//uploading picture
router.post("/image", UserController.uploadPhoto);

export default router;
