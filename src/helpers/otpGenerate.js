import otpGenerator from "otp-generator";
import users from "../models/user";


   export const otpCodeGenerate = async() => {
    const otpCode = otpGenerator.generate(5, {
      alphabets: false,
      upperCase: false,
      specialChars: false,
    }).toUpperCase();
    const UserFound = await users.find({otp:otpCode});
    if (otpCode.toString().trim().length != 5 || UserFound) {
      return otpCodeGenerate();
    } else {

      return otpCode;
    }
  };
