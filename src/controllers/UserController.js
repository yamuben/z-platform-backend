import Response from "../helpers/Response";
import UserServices from "../services/UserService";
import HttpStatus from "http-status";
import TokenAuthenticator from "../helpers/TokenAuthenticator";

class UserController {
  /**
   * User Signup controller
   * @static
   * @body {object} req  request object
   * @memberof UserServices
   * @returns {object} response
   */
  static async signup(req, res) {
    const newUser = await UserServices.userSignup(req, res);
    if(!newUser){
        return null;
    }
    let { phone, email, otp, isActive, statusVerification } = newUser.user;
    const token = TokenAuthenticator.tokenGenerator({
      phone,
      email,
      otp,
      isActive,
      statusVerification,
    });

    Response.successMessage(
      res,
      "Account created successfully! Please proceed to the next step of verifying your new account!",
      { ...newUser, token },
      HttpStatus.CREATED
    );
  }
  /**
   * User Signin controller
   * @static
   * @body {object} req  request object
   * @memberof UserServices
   * @returns {object} response
   */
  static async signin(req, res) {
    const userLogedIn = await UserServices.userSignin(req, res);
    if(!userLogedIn){
        return null;
    }
    let { phone, email, otp, isActive, statusVerification } = userLogedIn;
    const token = TokenAuthenticator.tokenGenerator({
      //   username,
      phone,
      email,
      otp,
      isActive,
      statusVerification,
    });

    Response.successMessage(
      res,
      "User loged in successfully! Please proceed to the next step of verifying your  account!",
      { userLogedIn, token },
      HttpStatus.OK
    );
  }


  /**
   * User Signin With OTP controller
   * @static
   * @body {object} req  request object
   * @memberof UserServices
   * @returns {object} response
   */
   static async signinWithOtp(req, res) {
    const userLogedIn = await UserServices.userOtpSignin(req, res);
    if(!userLogedIn){
        return null;
    }
    let { phone, email, isActive, statusVerification } = userLogedIn;
    const token = TokenAuthenticator.tokenGenerator({
      //   username,
      phone,
      email,
      isActive,
      statusVerification,
    });

    Response.successMessage(
      res,
      "OTP Verified successfully!",
      { userLogedIn, token },
      HttpStatus.OK
    );
  }
}
export default UserController;
