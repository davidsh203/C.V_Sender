const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config();



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors());

app.post('/sendmail', (req, res) => {
     console.log(req.body.ng_email,req.body.ng_message);
   
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.mailUser,
            pass: process.env.mailPass
        }
    });
    let mailOptions = {
        from: process.env.mailUser,
        to: req.body.ng_email,
        subject: 'I search my first junior job',
        text: req.body.ng_message
    };
    console.log("transporter");
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send('0');
        } else {
            console.log(`Email sent: ` + info.response);
            res.send('1');
        }
    });
});



app.listen(3000, () => { console.log('listen to 3000'); })


