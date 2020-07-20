const nodemailer = require('nodemailer');
const redis = require("redis");
const client = redis.createClient();

module.exports = app => {

    const myEmail = 'nasarepairtech@outlook.com';

    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        auth: {
            user: myEmail,
            pass: 'Liam0122' // <-------------- HIDE THIS
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    app.post("/sendMail", (req, res) => {        
        const { name, email, phone, comment, date } = req.body.frmData;
        const mailOptions = {
            from: myEmail,
            to: " anieves80@gmail.com", // <----------------CHANGE HERE
            subject: 'Sent from NasaTechIT.com',
            html: `<h2>Message</h2><h4>Name = ${name}</h4><h4>Email: ${email}</h4><h4>Phone: ${phone}</h4><h4>Date: ${date}</h4>
                   <h4>Comment:</h4> <p> ${comment}</p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.send({error});
            } else {
                res.send({msg:"ok"});
            }
        });
    });

    app.post("/addCart", (req,res) => {
        const pricesIntPkg = [0, 19.99, 34.99, 64.99, 119.99]; //none, 1month, 3month, 6month, 1yr
        const pricesLatPkg = [0, 19.99, 34.99, 64.99, 119.99]; //none, 1month, 3month, 6month, 1yr
        const { device, pkg, addService, price } = req.body;
        let verifyPrice = 0;

        device === "device1" ? verifyPrice += 170 :  verifyPrice += 120;        
        pkg === "pkg1" ? verifyPrice += pricesIntPkg[addService] : verifyPrice += pricesLatPkg[addService];
        
        client.on("error", function(error) {
            console.error(error);
        });

        if(verifyPrice == price){                    
            client.LPUSH(req.sessionID, [JSON.stringify(req.body)], function(err, reply) {
                if(err)
                    console.log(err);                
            });
            res.send({verifiedPrice:verifyPrice});
        } else {
            res.send({err:"error"});
        }
    });

    app.post("/deleteFromCart", (req,res) => {
        console.log(req.body);
        client.LINDEX(req.sessionID, req.body.id, function(err, reply) {
            if(err)
                console.log(err);
            else
                client.LREM(req.sessionID, 1, reply, function(err, reply) {
                    if(err)
                        res.send({err});
                    res.send({"stat":"ok"});
                });
        });        
    });
}
