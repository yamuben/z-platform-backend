import Response from "../helpers/Response";
import UserServices from "../services/UserService";
import catchAsyncErr from "../helpers/catchAsyncError";
import AppError from "../helpers/appError";
import HttpStatus from "http-status";
import TokenAuthenticator from "../helpers/TokenAuthenticator";
// import sendSms from "../helpers/sendSms";

class UserController {
    /**
     * User Signup controller
     * @static
     * @body {object} req  request object
     * @memberof UserServices
     * @returns {object} response
     */
    static async signup(req, res) {
        const newUser = await UserServices.userSignup(req);
        // console.log(newUser);
        // await sendSms("zProject", "+250787082328", "hello benjamin");
        const token = TokenAuthenticator.tokenGenerator(newUser);

        Response.successMessage(
            res,
            "Account created successfully! Please proceed to the next step of verifying your new account!", {...newUser, token },
            HttpStatus.CREATED
        );
    }
}
export default UserController;