// var messagebird = require("messagebird")("0G8xIDpYogW53BypTNYvFFfcI");

// const sendSms = async(smsFrom, smsTo, message) => {
//     // var params = {
//     //     originator: smsFrom,
//     //     recipients: [smsTo],
//     //     body: message,
//     // };
//     var params = {
//         'originator': '+250787082328',
//         'recipients': [
//             '+250787082328'
//         ],
//         'type': 'sms',
//         'body': 'This is your OTP'
//     };
//     messagebird.messages.create(params, function(err, response) {
//         if (err) {
//             return console.log(err);
//         }
//         console.log(response);
//     });
// };

// export default sendSms;