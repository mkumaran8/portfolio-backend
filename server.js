import express from "express";
import cors from "cors";
import http from "http";
import nodemailer from "nodemailer";

const app = express();

const server = http.createServer(app);

app.use(cors({
  credentials : true,
  origin : "*"
}))

app.use(express.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
    auth: {
        user: "kumaranworkspace@gmail.com",
        pass: "aeswuoammlqmckll"
    }
});


//http://localhost/4000/api/sendmail
app.post("/api/sendmail", (request, response) => {
  const mailConfigurations = {

      // It should be a string of sender/server email
      from: 'no-reply@gmail.com',
    
      to: "kumaranworkspace@gmail.com",
      
      // Subject of Email
      subject: `Email Verification`,

      // This would be the text of email body
      text: `Hi! There, is a visitor today our website.
            Name :  ${request.body.name} 
            Email Id : ${request.body.email}
            Subject : ${request.body.subject}
            Message : ${request.body.hello}`
        
  };      
    
  transporter.sendMail(mailConfigurations, function(error, info){
      if (error) throw Error(error);
      console.log('Email Sent Successfully');
      response.status(200).send('Email Sent Successfully');
  });
});


const portNumber = 4000;
server.listen(portNumber, () => {
  console.log("Node is running on port number 4000");
})