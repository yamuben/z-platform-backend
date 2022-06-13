import express from "express";
import UserController from "../controllers/UserController";
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

  // oktaAuthRequired,
  UserController.signup
);

export default router;
