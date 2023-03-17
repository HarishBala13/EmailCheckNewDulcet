const express=require("express");
const app=express();
const path=require("path");
const ejs=require("ejs");
var nodemailer=require("nodemailer");



app.use(express.urlencoded({extended:false}));
app.use('/assets',express.static('/public'));

app.set("view engine","ejs");

app.get('/',(req,res)=>{
    res.render("home");
});

app.get('/register',(req,res)=>{    
    res.render("register");
});
app.post('/dbregister',(req,res)=>{
    const email=req.body.email;
    const name=req.body.name;    
    console.log("Hostname : "+req.hostname);
    host=req.get('host');
    console.log("Host - "+host);
    var transporter=nodemailer.createTransport({
        service:'gmail',
        host: "2k19me016@kiot.ac.in",
        port: 465,
        secure: true,
        auth:{
            user:'2k19me016@kiot.ac.in',
            pass:'harish@13kiot'
        }
        });
        var mailoptions={
        from:'2k19me016@kiot.ac.in',
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
        transporter.sendMail(mailoptions,(err,info)=>{
        if(err) {
            throw err;
        }
        else{
        console.log('email sent : '+info.response);
    }
});
        res.render("login");
});

app.get('/logout',(req,res)=>{
    res.render("login");
});

app.get('/gmail',(req,res)=>{
    res.render("gmail");
});

app.listen(2002,(error,res)=>{
    if(error) console.log(error);
    console.log("Connected and Listening the port 2002");
});