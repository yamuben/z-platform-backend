import Response from "./helpers/Response";
import express from "express";
import bodyParser from "body-parser";
import HttpStatus from "http-status";
import  "dotenv/config";
import cors from "cors";
// import router from "./routes";
import mongoose from "mongoose";
import globalErrorHandler from "./helpers/errorController";

// dotenv.config({path:"../.env"})

const app = express();
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.text({ limit: "50mb" }));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));

// app.use("/", router);

app.get("/", (req, res) =>
  Response.successMessage(res, "zPlatform APIs", "", HttpStatus.BAD_REQUEST)
);

app.use(globalErrorHandler);
app.use("*", (req, res) =>
  Response.errorMessage(
    res,
    "Oops, this route does not exist",
    HttpStatus.NOT_FOUND
  )
);

// ---- Database connection ----

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected successfully!"));

// ---- Server Initialisation ----

const port = process.env.PORT || 9090;

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}...`);
});

export default app;
