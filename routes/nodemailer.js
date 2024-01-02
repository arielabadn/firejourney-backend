require("dotenv").config();
const router = require("express").Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`=== Server is ready to take messages: ${success} ===`);
});

router.post("/send", function (req, res) {
  // const mailOptions = {
  //   from: process.env.EMAIL,
  //   to: process.env.EMAIL,
  //   subject: "firejourneyapp",
  //   text: "New access to demo dashboard",
  // };

  // Replace code above when getting data from frontend
    const mailOptions = {
      from: process.env.EMAIL, //`${req.body.mailerState.email}`,
      to: process.env.EMAIL,
      subject: `${req.body.mailerState.subject}`,
      text: `${req.body.mailerState.message}`,
    };
    console.log(req.body.mailerState);

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("== Message failed to send ==");
      res.json({
        status: "fail",
      });
    } else {
      console.log("== Message Sent ==");
      res.json({
        status: "success",
      });
    }
  });
});

module.exports = router;
