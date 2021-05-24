const nodemailer = require("nodemailer");
const sendVerification = (req, res, next) => {
    const email = req.body.email;
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "adityapratamaputra74@gmail.com",
            pass: "eurekaseven",
        }
    });
    let mailOptions = {
        from: "Tickitz77@FakeMail.com",
        to: email,
        subject: "VERIFIKASI TICKITZ",
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Mulish:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">
    <title>Email Verification</title>
</head>
<style>
    *{
        font-family: 'Mulish', sans-serif;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    .container{
        width: 576px;
        margin: auto;
    }
    .btn{
        color: white;
        background: #5F2EEA;
        border: none;
        border-radius: 0.5rem;
        padding: 0.8rem 2.2rem;
        font-weight: 600;
        font-size: 1rem;
        margin: 1rem 0;
    }
    .btn:hover{
        cursor: pointer;
        background: #5127c5;
    }
    .my-5{
        margin: 3rem 0;
    }
    h2{
        margin: 1rem 0;
    }
</style>
<body>
    <div class="container">
        <div class="row">
            <div class="col-12">
                    <div class="my-5">
                        <img src="../assets/Vector.svg" alt="" style="width: 120px;">
                    </div>
                    <h2>accunt Varification</h2>
                    <p>Click Button Below to Verify</p>
                    <button><a href="${process.env.SERVER}user/verifycation/${email}" >Verify</a></button>
            </div>
        </div>
    </div>
</body>
</html>
        `
    };
    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("email terkirim");
        }
    });
};

module.exports = sendVerification;