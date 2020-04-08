const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const welcomeUser = (email, name)=>{
    sgMail.send({
        to: email,
        from: 'smsarath1234@gmail.com',
        subject: 'Welcome!!!',
        text: `Thanks for choosing our app ${name}. welcome to our family.`
    }).then().catch(err=>{
        console.log(err.response.body);    
    });
};

const exitUser = (email, name)=>{
    sgMail.send({
        to: email,
        from: 'smsarath1234@gmail.com',
        subject: 'Thank you!!!',
        text: `Hopr u had fun ${name}. Goodbye.`
    }).then().catch(err=>{
        console.log(err.response.body);    
    });
};

module.exports = {
    welcomeUser,
    exitUser
}