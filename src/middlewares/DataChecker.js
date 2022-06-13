import users from "../models/user";
import Response from "../helpers/Response";
import HttpStatus from "http-status";
class DataChecker {
  static validateEmailNotExist = async (req, res, next) => {
    const UserFound = await users.findOne({ email: req.body.email });
    if (!UserFound) {
      return next();
    } else {
      return Response.errorMessage(
        res,
        "Email is already exist",
        HttpStatus.CONFLICT
      );
    }
  };
  static validateEmailExist = async (req, res, next) => {
    const UserFound = await users.findOne({ email: req.body.email });
    if (!UserFound) {
      return Response.errorMessage(
        res,
        "Email is not exist,You are not registered",
        HttpStatus.NOT_FOUND
      );
    } else {
      return next();
    }
  };
}

export default DataChecker;
