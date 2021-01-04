const sgMail = require('@sendgrid/mail');
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (mailOptions) => {
    return new Promise((resolve, reject) => {
        sgMail.send(mailOptions, (error, result) => {
            if (error) return reject(error);
            return resolve(result);
        });
    });
}

const sendVerificationEmail = async (user, token) => {
    try{
        const serverUrl = process.env.NODE_ENV === 'production' ? process.env.PROD_SERVER_URL : process.env.DEV_SERVER_URL;
        const subject = "Account Verification Token";
        const to = user.email;
        const from = process.env.FROM_EMAIL;
        const link= serverUrl+"api/token/verify/"+token;
        const html = `<p>Hi ${user.name}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
                  <br><p>If you did not request this, please ignore this email.</p>`;
        await sendEmail({to, from, subject, html});
        return {message: 'A verification email has been sent to ' + user.email + '.', code: 200}
    }catch (error) {
        console.log(error, error.response, error.response.body)
        return {message: error.message, code: 500}
    }
}

const sendNewThirdPartySignUpEmail = async (user, type, password) => {
    try{
        const subject = "Account have just created";
        const to = user.email;
        const from = process.env.FROM_EMAIL;
        const html = `<p>Hi ${user.name}<p><br><p>You have just create your account by ${type} auth. Your default password is: ${password}. Please keep it secret or update it as soon as possible.</p> 
                  <br><p>If you did not request this, please ignore this email.</p>`;
        await sendEmail({to, from, subject, html});
    }catch (error) {
        console.log(error, error.response, error.response.body)
    }
}

const sendRecoverEmail = async (user) => {
    try{
        const serverUrl = process.env.NODE_ENV === 'production' ? process.env.PROD_SERVER_URL : process.env.DEV_SERVER_URL;
        // send email
        const subject = "Password change request";
        const to = user.email;
        const from = process.env.FROM_EMAIL;
        const link = serverUrl + "api/recover/verify/" + user.resetPasswordToken;
        const html = `<p>Hi ${user.name}</p>
                  <p>Please click on the following <a href="${link}">link</a> to reset your password.</p> 
                  <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

      await sendEmail({to, from, subject, html});

        return {message: 'A verification email has been sent to ' + user.email + '.', code: 200}
    }catch (error) {
        return {message: error.message, code: 500}
    }
}

const sendSuccessUpdateEmail = async (user) => {
    try{
        // send email        
        const subject = "Your password has been changed";
        const to = user.email;
        const from = process.env.FROM_EMAIL;
        const html = `<p>Hi ${user.name}</p>
                    <p>This is a confirmation that the password for your account ${user.email} has just been changed.</p>`

        await sendEmail({to, from, subject, html});

        return {message: 'A verification email has been sent to ' + user.email + '.', code: 200}
    }catch (error) {
        return {message: error.message, code: 500}
    }
}

module.exports = { sendRecoverEmail, sendVerificationEmail, sendSuccessUpdateEmail, sendNewThirdPartySignUpEmail };