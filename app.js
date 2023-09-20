// const nodemailer = require('nodemailer')

// async function kirimEmail(){
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'aryahirawansyah@gmail.com',
//             pass: 'fshn xwtr mllr neou'
//         }
//     });

//     const sendMail = transporter.sendMail({
//         from : 'noreply',
//         to : '202310031@student.ibik.ac.id',
//         subject : 'Test Email',
//         text : 'Test Email itu mudah',
//         attachments : [{
//             filename: 'green.jpg',
//             path : 'image.jpg'
//         }]
//     });

//     console.log("email berhasil dikirim");
// }

// kirimEmail();

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aryahirawansyah@gmail.com',
        pass: 'fshn xwtr mllr neou'
    }
});

var mailOptions = {
    from: 'aryahirawansyah@gmail.com',
    to: '202310031@student.ibik.ac.id',
    subject: 'Sending Email using Nodejs',
    html: '<h1>Welcome</h1><p>That was easy!</p>',
    attachments: [
        {
            filename: 'text1.txt',
            content: 'hello world!'
        }
    ]
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log('Email sent: ' + info.response);
});