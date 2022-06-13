import UserAccount from "../models/user";
import UserProfile from "../models/profile";
import IdentintyDocs from "../models/identityDoc";
import generateOtp from "../helpers/otpGenerate"

// import SendSMS from "../helpers/sendSMS";
import Response from "../helpers/Response";
import HttpStatus from "http-status";
import HashPassword from "../helpers/HashPassword";

class UserServices {
  /**
   * User Signup service
   * @static
   * @body {object} req  request object
   * @memberof UserServices
   * @returns {object} data
   */
  static async userSignup(req, res) {
    const user = await UserAccount.create(req.body);
    req.body.password = HashPassword.hashPassword(req.body.password);
    req.body.otp = generateOtp.otpCodeGenerate();           

    // console.log(req.body.password)
    if (user) {
      const userProfile = await UserProfile.create({
        ...req.body,
        userAccount: user._id,
      });
      if (userProfile) {
        return { user, userProfile };
      }
    }

    return Response.errorMessage(res, { error: "server error" }, 500);
  }
}

export default UserServices;
