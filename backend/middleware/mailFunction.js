const Console = require("console");
const nodemailer = require("nodemailer");


async function sendMail(emailInfo, aMessage) {
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: "jayne.kuphal74@ethereal.email",
            pass: "175vvphtKdzJKMcRNY"
        },
    });

    const msg = {
        from: '"e_commerce app" <MyApp@example.com>',
        to: emailInfo.to,
        subject: emailInfo.subject,
        text: aMessage
    }

    const info = await transporter.sendMail(msg, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log("Email was sent successfully");
            console.log("Preview URL: %s ", nodemailer.getTestMessageUrl(info));
        }
    })
}

module.exports = {
    sendMail
}