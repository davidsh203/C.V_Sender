const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors());

app.post('/sendmail', (req, res) => {
    // console.log(req.body.ng_email,req.body.ng_message);
    // console.log('123');
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "",
            pass: ""
        }
    });
    
    let mailOptions = {
        from: process.env.mailUser,
        to: req.body.ng_email,
        subject: 'I search my first junior job',
        text: req.body.ng_message
    };
    
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email ${i} sent: ` + info.response);
        }
    });

});



app.listen(3000, () => { console.log('listen to 3000'); })


