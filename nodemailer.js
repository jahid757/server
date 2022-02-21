const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const smtpServer = {
    host: "http://Example Group.com.au/webmail",
    port: 465,
    auth: {
        user: "clients@Example Group.com.au",
        pass: "82Z02JhPa{Sg"
    }
}

const emailFrom = '"Example Group" <accounts@Example Group.com.au>';

const adminEmail = "quincy.adams123@protonmail.com";

const domain = "https://lseequity.live"

var moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GBP',
  });


exports.sendPaymentDetailsEmail = async (email, paymentDetails) => {
    console.log("Sending payment details email...");
    console.log("Payment details in email function: ", paymentDetails);
    const filePath = path.join(__dirname, '../email-templates/payment-details.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);

    const replacements = {
        firstName: paymentDetails.firstName, 
        paymentAmount: moneyFormatter.format(paymentDetails.amount), 
        accountName: paymentDetails.accountName, 
        sortcode: paymentDetails.sortCode, 
        accountNumber: paymentDetails.accountNumber, 
        iban: paymentDetails.IBAN ? paymentDetails.IBAN : 'None',
        swift: paymentDetails.SWIFT ? paymentDetails.SWIFT : 'None', 
        reference: paymentDetails.reference ? paymentDetails.reference : 'None'
    };

    try {
        const htmlToSend = template(replacements);
        var transporter = nodemailer.createTransport(smtpServer);

        const mailOptions = {
            from: emailFrom,
            to: email,
            subject: "Deposit Details | Example Group Ltd",
            text: "Please allow HTML to view your email",
            html: htmlToSend
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", "https://mailtrap.io/inboxes/test/messages/");
    } catch (error) {
        console.log(error);
    }
}

exports.sendConfirmedDepositEmail = async (email, firstName) => {
    console.log("Sending confirmed deposit email for...", firstName);

    const filePath = path.join(__dirname, '../email-templates/approved_deposit_notification.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);

    const replacements = {
        firstName: firstName,
        domain: domain
    };

    try {
        const htmlToSend = template(replacements);
        var transporter = nodemailer.createTransport(smtpServer);

        const mailOptions = {
            from: emailFrom,
            to: email,
            subject: "Deposit Confirmation | Example Group Ltd",
            text: "Please allow HTML to view your email",
            html: htmlToSend
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", "https://mailtrap.io/inboxes/test/messages/");
    } catch (error) {
        console.log(error);
    }
}

// New Sign Up email.
exports.sendNewSignupEmail = async (email, password, firstName) => {
    console.log("Sending email...");
    const filePath = path.join(__dirname, '../email-templates/new-signup.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);

    const replacements = {
        firstName: firstName, 
        email: email,
        password: password,
        domain: domain
    };

    const htmlToSend = template(replacements);
    var transporter = nodemailer.createTransport(smtpServer);

    const mailOptions = {
        from: emailFrom,
        to: email,
        subject: "New Sign Up | Example Group Ltd",
        text: "Please allow HTML to view your email",
        html: htmlToSend
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
}

exports.sendResetPasswordEmail = async (email, password) => {
    console.log("Sending email...");
    const filePath = path.join(__dirname, '../email-templates/reset-password.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);

    const replacements = {
        email: email,
        password: password,
        domain: domain
    };

    const htmlToSend = template(replacements);
    var transporter = nodemailer.createTransport(smtpServer);

    const mailOptions = {
        from: emailFrom,
        to: email,
        subject: "Reset Password | Example Group Ltd",
        text: "Please allow HTML to view your email",
        html: htmlToSend
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
}

// New Trade email.
exports.sendNewBondTradeEmail = async (email, tradeDetails) => {
    console.log("Sending new bond trade email...");
    const filePath = path.join(__dirname, '../email-templates/new-trade-notification-bonds.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);

    const replacements = {
        firstName: tradeDetails.firstName, 
        product: tradeDetails.product,
        amount: moneyFormatter.format(tradeDetails.amount),
        maturityTerm: tradeDetails.maturityTerm,
        payout: tradeDetails.payoutFreq,
        annualReturn: tradeDetails.annualReturn,
        ISIN: tradeDetails.ISIN,
        purchaseDate: tradeDetails.dateCreated
    };

    const htmlToSend = template(replacements);
    var transporter = nodemailer.createTransport(smtpServer);

    const mailOptions = {
        from: emailFrom,
        to: email,
        subject: "Investment Details | Example Group Ltd",
        text: "Please allow HTML to view your email",
        html: htmlToSend
    };
    const info = await transporter.sendMail(mailOptions).then(result => console.log(result))
        .catch(err => console.log(err));
    console.log("Message sent to for new trade email.");
}

exports.sendNewIposTradeEmail = async (email, tradeDetails) => {
    console.log("Sending new ipos trade email...");
    const filePath = path.join(__dirname, '../email-templates/new-trade-notification-ipos.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);

    const replacements = {
        firstName: tradeDetails.firstName,
        company: tradeDetails.company, 
        symbol: tradeDetails.symbol,
        capitalInvested: moneyFormatter.format(tradeDetails.amount), 
        sharesNumber: tradeDetails.sharesNumber,
        sharePrice: moneyFormatter.format(tradeDetails.sharePrice),
        purchaseDate: tradeDetails.dateCreated,
        logo: tradeDetails.logo
    };

    const htmlToSend = template(replacements);
    var transporter = nodemailer.createTransport(smtpServer);

    const mailOptions = {
        from: emailFrom,
        to: email,
        subject: "Investment Details | Example Group Ltd",
        text: "Please allow HTML to view your email",
        html: htmlToSend
    };
    const info = await transporter.sendMail(mailOptions).then(result => console.log(result))
        .catch(err => console.log(err));
    console.log("Message sent to for new trade email.");
}

exports.sendVerificationEmail = async (email, firstName) => {
    console.log("Sending new verification email...");
    const filePath = path.join(__dirname, '../email-templates/account-verified.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);

    const replacements = {
        domain: domain,
        firstName: firstName || "Sir/Madam"
    };

    const htmlToSend = template(replacements);
    var transporter = nodemailer.createTransport(smtpServer);

    const mailOptions = {
        from: emailFrom,
        to: email,
        subject: "Account Approved | Example Group Ltd",
        text: "Please allow HTML to view your email",
        html: htmlToSend
    };
    const info = await transporter.sendMail(mailOptions).then(result => console.log(result))
        .catch(err => console.log(err));
    console.log(`Message sent to for verification email for ${email}`);
}

exports.sendAccountBankDetailsUpdated = async (email, firstName) => {
    console.log("Sending account bank details updated...");
    const filePath = path.join(__dirname, '../email-templates/account-updated.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);

    const replacements = {
        domain: domain,
        firstName: firstName
    };

    const htmlToSend = template(replacements);
    var transporter = nodemailer.createTransport(smtpServer);

    const mailOptions = {
        from: emailFrom,
        to: email,
        subject: "Account Updated | Example Group Ltd",
        text: "Please allow HTML to view your email",
        html: htmlToSend
    };
    const info = await transporter.sendMail(mailOptions).then(result => console.log(result))
        .catch(err => console.log(err));
    console.log(`Message sent to for bank account details updated to ${email}`);
}

exports.sendClientDepositNotification = async (email, firstName, amount) => {
    console.log("Sending client deposit notification...");
    const filePath = path.join(__dirname, '../email-templates/deposit_request.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);

    const replacements = {
        firstName: firstName,
        amount: amount,
        domain: domain
    };

    const htmlToSend = template(replacements);
    var transporter = nodemailer.createTransport(smtpServer);

    const mailOptions = {
        from: emailFrom,
        to: email,
        subject: "Deposit Notification | Example Group Ltd",
        text: "Please allow HTML to view your email",
        html: htmlToSend
    };
    const info = await transporter.sendMail(mailOptions).then(result => console.log(result))
        .catch(err => console.log(err));
    console.log(`Message sent for admin deposit notification to admin ${adminEmail}`);
}

// ADMIN EMAILS

exports.sendAdminDepositNotification = async (amount, name, email, phone) => {
    console.log("Sending admin deposit notification...");
    const filePath = path.join(__dirname, '../email-templates/admin_deposit_notification.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);

    const replacements = {
        amount: amount,
        name: name,
        email: email,
        phone: phone,
        domain: domain
    };

    console.log("Replacements in send admin thing: ", replacements);

    const htmlToSend = template(replacements);
    var transporter = nodemailer.createTransport(smtpServer);

    const mailOptions = {
        from: emailFrom,
        to: adminEmail,
        subject: "Deposit Notification | Example Group Ltd",
        text: "Please allow HTML to view your email",
        html: htmlToSend
    };
    const info = await transporter.sendMail(mailOptions).then(result => console.log(result))
        .catch(err => console.log(err));
    console.log(`Message sent for admin deposit notification to admin ${adminEmail}`);
}

exports.sendAdminBondSaleNotification = async (amount, name, email, phone, company) => {
    console.log("Sending admin deposit notification...");
    const filePath = path.join(__dirname, '../email-templates/admin_bond_sale_notification.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);

    const replacements = {
        amount: amount,
        name: name,
        email: email,
        phone: phone,
        company: company,
        domain: domain
    };

    console.log("Replacements in send admin thing: ", replacements);

    const htmlToSend = template(replacements);
    var transporter = nodemailer.createTransport(smtpServer);

    const mailOptions = {
        from: emailFrom,
        to: adminEmail,
        subject: "Deposit Notification | Example Group Ltd",
        text: "Please allow HTML to view your email",
        html: htmlToSend
    };
    const info = await transporter.sendMail(mailOptions).then(result => console.log(result))
        .catch(err => console.log(err));
    console.log(`Message sent for admin deposit notification to admin ${adminEmail}`);
}