import HttpStatus from "http-status";
const cloudinary = require("cloudinary").v2;
import Response from "../helpers/Response";
import UserServices from "../services/UserService";
import TokenAuthenticator from "../helpers/TokenAuthenticator";
import "dotenv/config";

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
    newUser.user.password = "";
    if (!newUser) {
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
    if (!userLogedIn) {
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
    if (!userLogedIn) {
      return null;
    }
    let { _id, phone, email, isActive, statusVerification, role } = userLogedIn;
    const token = TokenAuthenticator.tokenGenerator({
      //   username,
      _id,
      phone,
      email,
      isActive,
      role,
      statusVerification,
    });

    Response.successMessage(
      res,
      "OTP Verified successfully!",
      { userLogedIn, token },
      HttpStatus.OK
    );
  }

  /**
   * User Identification
   * @static
   * @body {object} req  request object
   * @memberof UserServices
   * @returns {object} response
   */
  static async createIdentity(req, res) {
    const newUserDoc = await UserServices.createIdentity(req, res);
    if (!newUserDoc) {
      return null;
    }
    Response.successMessage(
      res,
      "Document well upload, under review...",
      { newUserDoc },
      HttpStatus.CREATED
    );
  }
  /**
   * User Identification
   * @static
   * @body {object} req  request object
   * @memberof UserServices
   * @returns {object} response
   */
  static async updateUser(req, res) {
    const updatedUser = await UserServices.updateUser(req, res);
    if (!updatedUser) {
      return null;
    }
    Response.successMessage(
      res,
      "User updated successfully",
      { user: updatedUser },
      HttpStatus.OK
    );
  }

  /**
   * Get all users
   * @static
   * @body {object} req  request object
   * @memberof UserServices
   * @returns {object} response
   */
  static async getAllUsers(req, res) {
    const users = await UserServices.getAllUsers();
    Response.successMessage(
      res,
      "User updated successfully",
      users,
      HttpStatus.OK
    );
  }

  /**
   * User upload Image controller
   * @static
   * @body {object} req  request file/image
   * @memberof UserServices
   * @returns {object} response
   */
  static uploadPhoto = async (req, res, next) => {
    if (!req.files) {
      return Response.errorMessage(res, "Kindly Upload File ", 400);
    }

    const file = req.files.files;

    // console.log("@@@@@@@", req.files);
    //Make sure the image is a photo
    if (!file.mimetype.startsWith("image")) {
      return Response.errorMessage(res, "Kindly Upload Image File ", 400);
    }
    console.log(file);
    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return Response.errorMessage(
        res,
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD} `,
        400
      );
    }

    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      if (err) {
        return Response.errorMessage(
          res,
          `Problem with uploading the image `,
          500
        );
      }
      res.status(200).json({
        success: true,
        secure_url: result.secure_url,
      });
    });
  };
}
export default UserController;
