import Response from "../helpers/Response";
import httpStatus from "http-status";

const verifyAccess = function (requiredRole) {
  return async (req, res, next) => {
    try {
      const { role: role ,isActive:isActive} = req.user;
      if (requiredRole !== role) {
        return Response.errorMessage(
          res,
          "Unauthorized! You don't have access to this Api",
          httpStatus.UNAUTHORIZED
        );
      }
      console.log(isActive)
      if(!isActive){
        return Response.errorMessage(
          res,
          "Unauthorized! You don't have access to this Api, Your account is Inactive",
          httpStatus.UNAUTHORIZED
        );

      }
      next();
    } catch (error) {
      Response.errorMessage(
        res,
        "Internal server error!",
        httpStatus.INTERNAL_SERVER_ERROR
      );
    }
  };
};
export default verifyAccess;