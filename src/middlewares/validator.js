import { check, query, validationResult } from "express-validator";
import Response from "../helpers/Response";
/**
 * @export
 * @class Validator
 */
class Validator {
  /**
   * Validate input
   * @static
   * @returns {object} error description OR return next middleware
   */
  static validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.errors.map((err) => err.msg);
      return Response.errorMessage(res, errorMessage, 400);
    }
    return next();
  };

  /**
   * Validate new account input
   * @static
   * @returns {object} errors
   */
  static accountRules() {
    return [
      check("email", "email should be valid").trim().isEmail(),
      check(
        "password",
        "A valid password should have a character, number, UPPER CASE letter and a lower case letter and should be longer than 8"
      ).trim().isStrongPassword()
    ];
  }
}

export default Validator;
