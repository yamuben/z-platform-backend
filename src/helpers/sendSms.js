import axios from "axios";
import qs from "qs";
import "dotenv/config"

class SendSMS {
  constructor(recepient, otpCode, url) {
    this.to = recepient.phone;
    this.from = "HePay";
    this.url = process.env.SMS_URL;
    this.otpCode = otpCode;
  }

  async send() {
    const message = `
        Z-${this.otpCode} is your ZPlatform verification code.
      `;

    const data = qs.stringify({
      message,
      sender: this.from,
      recipients: this.to,
    });

    const config = {
      method: "post",
      url: this.url,
      headers: {
        Authorization: "Basic bXVuZXplbW15Om1lbW15MDcyMjQwNDUyOA==",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    try {
      const res = await axios(config);
      
      return res.data;
    } catch (error) {
      return error;
    }
  }

  async sendotpCodeSMS() {
    return await this.send();
  }
}

export default SendSMS;
