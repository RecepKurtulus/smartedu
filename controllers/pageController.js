const nodemailer = require('nodemailer');
const User = require('../models/User');
const Courses = require('../models/Course');
exports.getIndexPage= async (req, res) =>{
    const indexCourses=await Courses.find().limit(10);
    indexCourses.reverse();
    const totalTeachers=await User.countDocuments({role:"Teacher"});
    const totalStudents=await User.countDocuments({role:"Student"});
    const totalCourses= await Courses.countDocuments();

    console.log(req.session.userID);
    res.status(200).render('index', { pageName: 'index',totalTeachers,totalStudents,totalCourses,indexCourses});
}
exports.getAboutPage= (req, res) =>{
    res.status(200).render('about',{pageName: 'about',});
}
exports.getRegisterPage= (req, res) =>{
    res.status(200).render('register',{pageName: 'register',});
}
exports.getLoginPage= (req, res) =>{
    res.status(200).render('login',{pageName: 'login',});
}
exports.getContactPage= (req, res) =>{
    res.status(200).render('contact',{pageName: 'contact',});
}
exports.sendEmail= async (req, res) =>{
  try{
    const outputMsg = `
    <h1>Message Details</h1>
    <ul>
    <li>Name:${req.body.first_name} </li>
    <li>Surname:${req.body.last_name} </li>
    <li>Mail: ${req.body.email}</li>
    <li>PhoneNumber: ${req.body.phone}</li>
    </ul>
    <h1>Message: </h1>
    <p>${req.body.message} </p>
    
    `
    //Emailde göndereceğimiz bilgiler

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'phoibosq@gmail.com',//Gmail account
          pass: 'mktfmhvsvazqqrmg' //Gmail password
        }
      });
      
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Smartedu Contact Form" <phoibosq@gmail.com>', // sender address
          to: "rekkoqq@gmail.com", // list of receivers
          subject: "Smartedu ⭐", // Subject line
          html: outputMsg, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        req.flash('success',"We received your message successfully");
        
        res.status(201).redirect('/contact');
}

  }
  catch(error){
    req.flash(error, `Something happened!`);
    
  }
    

}
