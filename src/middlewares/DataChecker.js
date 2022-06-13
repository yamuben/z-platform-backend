import generateOtp from "../helpers/otpGenerate";
import users from "../models/user";
class DataChecker {
  static validateOtp = async (req, res, next) => {
    const otp = generateOtp.otpCodeGenerate();
    const UserFound = await users.find({ otp: otp });
    if(UserFound){
        return validateOtp();
    }
    else{
        req.body.otp = otp;
        console.log("OOOOOOOOOTTTTTTP",otp)
        return next();
    }
  };
}

export default DataChecker;
