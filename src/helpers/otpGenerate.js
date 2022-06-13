import users from "../models/user";

export const otpCodeGenerate = async () => {
  const otpCode = Math.floor(Math.random() * 1000000);
  const UserFound = await users.findOne({ otp: otpCode });
  if (otpCode.toString().trim().length != 6 || UserFound) {
    return otpCodeGenerate();
  } else {
    return otpCode;
  }
};
