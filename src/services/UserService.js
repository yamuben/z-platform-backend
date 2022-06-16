import UserAccount from "../models/user";
import UserProfile from "../models/profile";
import IdentityDoc from "../models/identityDoc";
import SendSMS from "../helpers/sendSms";
import { otpCodeGenerate } from "../helpers/otpGenerate";

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
    req.body.password = HashPassword.hashPassword(req.body.password);
    req.body.otp = await otpCodeGenerate();
    const user = await UserAccount.create(req.body);
    // const result = await new SendSMS(
    //     user,
    //     req.body.otp,
    //     "reset"
    //   ).sendotpCodeSMS();
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

  /**
   * User Signin service
   * @static
   * @body {object} req  request object
   * @memberof UserServices
   * @returns {object} data
   */
  static async userSignin(req, res) {
    const otpCode = await otpCodeGenerate();
    console.log("OTP-CODE::::", otpCode);
    const user = await UserAccount.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (user) {
      if (HashPassword.matchingPassword(req.body.password, user)) {
        const result = await new SendSMS(
            user,
            otpCode,
            "reset"
          ).sendotpCodeSMS();
        const userLogin = await UserAccount.findByIdAndUpdate(
          user._id,
          { otp: otpCode, isActive: false },
          { new: true }
        ).select("-password");
        return userLogin;
      }
      return Response.errorMessage(
        res,
        { error: "Password is not correct" },
        HttpStatus.BAD_REQUEST
      );
    }

    return Response.errorMessage(res, { error: "server error" }, 500);
  }
  /**
   * User Signin service
   * @static
   * @body {object} req  request object
   * @memberof UserServices
   * @returns {object} data
   */
  static async userOtpSignin(req, res) {
    const user = await UserAccount.findOne({ otp: req.body.otp }).select(
      "-password"
    );
    console.log("LLLLLLLLLLL", user);
    if (!user) {
      return Response.errorMessage(
        res,
        { error: "OTP is not correct" },
        HttpStatus.BAD_REQUEST
      );
    }
    const userUpdated = await UserAccount.findByIdAndUpdate(
      user._id,
      { isActive: true, otp: null },
      { new: true }
    );
    return userUpdated;
  }

  /**
   * User register identification
   * @static
   * @body {object} req  request object
   * @memberof UserServices
   * @returns {object} data
   */
  static async createIdentity(req, res) {
    const newIdentityDoc = await IdentityDoc.create(req.body);
    if (!newIdentityDoc) {
      return Response.errorMessage(
        res,
        { error: "OTP is not correct" },
        HttpStatus.BAD_REQUEST
      );
    } else {
      await UserAccount.findByIdAndUpdate(
        req.user._id,
        { statusVerification: "pending" },
        { new: true }
      );

      const updatedUserProfile = await UserProfile.findOneAndUpdate(
        { userAccount: req.user._id },
        {
          identityDoc: newIdentityDoc._id,
        },
        { new: true }
      );
      console.log(updatedUserProfile);

      return updatedUserProfile;
    }
  }

  static async updateUser(req, res) {
    const userUpdated = await UserAccount.findByIdAndUpdate(
      req.params.id,
      { statusVerification: "verified" },
      { new: true }
    );
    if (!userUpdated) {
      return null;
    }
    return userUpdated;
  }

  static async getAllUsers() {
    const users = await UserProfile.find();
    return users;
  }
  static async getMyProfile(req, res) {
    const userProfile = await UserProfile.findOne({
      userAccount: req.user._id,
    });
    console.log(userProfile);
    const acc = userProfile?.userAccount;
    return userProfile;
  }
}

export default UserServices;
