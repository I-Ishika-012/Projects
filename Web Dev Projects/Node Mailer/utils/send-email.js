const nodemailer = require("nodemailer");

const sendEmail = async (to, messageBody)  => {
    try{
        // create reusable transporter object using the default SMTP transport, to specify the email provider
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, //using plaintext smtp
            auth: {
                // user: process.env.EMAIL_USER,
                // pass: process.env.EMAIL_PASS
                user : "ishika@yopmail.com",
                pass : ""
            }
            //?ALTERNATIVE
            //user : "Add username",
            //pass : ""

        });

        //message object
        const message = {
            from: "ishika@yopmail.com",
            to: to,
            // from: process.env.EMAIL_USER,
            // to : process.env.EMAIL_USER,
            subject: "Message from NodeMailerApp",
            html : `
            <h1>New Message from NodeMailerApp</h1>
            <p>${messageBody}</p>
            `
        };

        // send mail with defined transport object
        const info = await transporter.sendMail(message);
        console.log("Message sent: %s", info.messageId);
        } catch (error) {
            console.log(error);
            throw new Error("Error sending email");
        }

    };

    module.exports = sendEmail;
