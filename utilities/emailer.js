const nodemailer = require("nodemailer");


exports.SendMail =  async (reciever, subject, text,html) =>{


    let transporter = nodemailer.createTransport({
         host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: "3cf20485a4921f",
        pass: "ec921e7ffbad7d"}
    })

      let info = await transporter.sendMail({
        from: '"Node Mailer" <node@mailer.com>', // sender address
        to: receiver,
        subject,
        text,
        html,
      });
}