var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var nodemailer = require('nodemailer');
var path

http.createServer((req, res) => {

    if (req.url === "/") {
        // redirect ke halaman contact form
        res.writeHead(302, {
            'Location': '/index/'
        });
        res.end();
    }

    // load the contact form
    if (req.url === "/index/" && req.method === "GET") {
        fs.readFile("index.html", (err, data) => {
            if (err) throw err;
            res.end(data);
        });
    }

    // send the email
    if (req.url === "/index/" && req.method === "POST") {

        var requestBody = '';
        req.on('data', function (data) {
            // tangkap data dari form
            requestBody += data;

            // kirim balasan jika datanya terlalu besar
            if (requestBody.length > 1e7) {
                res.writeHead(413, 'Request Entity Too Large', { 'Content-Type': 'text/html' });
                res.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
            }
        });

        var Storage = multer.diskStorage({
          destination: function(req, file, callback) {
              callback(null, "./images");
          },
          filename: function(req, file, callback) {
              callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
          }
      });
      
        var path = multer({
            storage: Storage
        }).single("image"); //Field name and max count
        
        app.get('/',(req,res) => {
            res.sendFile(__dirname + '/index.html')
        })

        req.on('end', function () {           
            let formData = qs.parse(requestBody);

            path = req.file.path
            console.log(req.file)
            console.log(req.files)
            // send the email
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'aryahirawansyah@gmail.com',
                    pass: 'fshn xwtr mllr neou'
                }
            });

            let mailOptions = {
                from: formData.email,
                replyTo: formData.email,
                to: '202310031@student.ibik.ac.id',
                subject: formData.subject,
                text: formData.message,
                attachments: [{
                    path: path
                }]
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) throw err;
                console.log('Email sent: ' + info.response);
                fs.unlink(path);
                res.end("Thank you!");
            });
        });

    }

}).listen(8000);

console.log('server listening on http://localhost:8000/');