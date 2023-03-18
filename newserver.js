const express=require("express");
const app=express();
const nodemailer = require("nodemailer");
require("path");
require("dotenv").config();
app.use(express.urlencoded({extended:false}));
app.use('/assets', express.static('/public'));

app.set("view engine","ejs");
app.get('/',(req,res)=>{
    res.render("home");
});
app.get('/register',(req,res)=>{
    res.render("register");
});
app.post('/dbregister',async(req,res)=>{
    const email=req.body.email;
    const name=req.body.name;    
    console.log("Hostname : "+req.hostname);
    host=req.get('host');
    console.log("Host - "+host);

    var transporter=nodemailer.createTransport({
        service:'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth:{
            user:process.env.EMAIL_ID,
            pass:process.env.EMAIL_PASSWORD
        }
        });

        await new Promise((resolve, reject)=>{
            transporter.verify(function (error, success) {
                if(error){
                    console.log(error);
                    reject(error);
                }
                else{
                    console.log("server is ready");
                    resolve(success);
                }                
            });
        });

        var mailoptions={
        from:process.env.EMAIL_ID,
        to:email,
        subject:'Thanks for Registering',
        text:`Hi `+name,
        html:`<div>
        <h4 style="font-size:20px;">Thanks for choosing our Service</h4>
        <img style=" width: 65px; height: 45px; border-radius: 50%; " src="https://drive.google.com/file/d/16LrAcB0Jnw-4fBrM9bX5KVZyLwgwDka7/view?usp=share_link" alt="Dulcet logo">
        <p style="text-align:justify;">We are happy to announce that you are a valuable customer to us and we won't let you down in any situation</p>
        <p style="text-align:justify; color:#0fd6d6;">Once a Dulcet user always a Ghost</p>
        <p style="text-align:justify;">Thanks,<br>The Dulcet Team.</p>
        </div>`
        };
        await new Promise((resolve,reject)=>{
            transporter.sendMail(mailoptions,(err,info)=>{
                if(err) {
                    reject(err);
                    console.error(err);
                }
                else{
                console.log('email sent : '+info.response);
                resolve(info);
            }
        });
        });
        // res.render("login");
});

app.listen(2500,(err)=>{
    console.log("port is connected @2500");
});