import users from "../models/user";
import TokenAuthenticator from "../helpers/TokenAuthenticator";
import Response from "../helpers/Response";
import HttpStatus from "http-status";

const isUserExist = async (req, res, next) => {
  try {
    const token =
      req.header("x-auth-token") ||
      req.params["x-auth-token"] ||
      req.params["token"] ||
      req.query["token"];
    if (!token) {
      return Response.errorMessage(
        res,
        "No token found!",
        HttpStatus.NOT_FOUND
      );
    }
    const payload = TokenAuthenticator.decodeToken(token);
    const { name } = payload;
    if (name === "JsonWebTokenError") {
      return Response.errorMessage(
        res,
        "Unauthorized, invalid token",
        HttpStatus.UNAUTHORIZED
      );
    }

    if (name === "TokenExpiredError") {
      return Response.errorMessage(
        res,
        "Unauthorized, Token has expired signin again to get new tokenn",
        HttpStatus.UNAUTHORIZED
      );
    }

    const validUser = await users.findOne({
      _id: payload._id,
    });
    if (!validUser) {
      return Response.errorMessage(
        res,
        "You' re not authorized!, No ID found.",
        HttpStatus.UNAUTHORIZED
      );
    }
    req.user = payload;
    req.token = token;
    next();
  } catch (error) {
    return Response.errorMessage(
      res,
      "You can not proceed without setting a valid token",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};
export default isUserExist;
