const User = require('../models/User');
const Course = require('../models/Course');
const Category = require('../models/Category');
const bcrypt = require('bcrypt');
const session=require('express-session');

//Course modelimizi çağırdık

exports.CreateUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    req.flash('success',"You registered successfully");
    res.status(201).redirect('/login')
    console.log(`${user.name} created successfully`);
  } catch (error) {
    req.flash('error', `Something happened!`);
    main().catch(console.error);
  }
  
};
exports.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    //userimizin emaili ile ilkte database de bulmaya çalışıyoruz
    
    if (user) {
      const same = await bcrypt.compare(password, user.password);
      //Eğer bulduysak şifresini kıyaslıyoruz
      if (same) {
        req.session.userID=user._id;
        
        res.status(200).redirect('/user/dashboard');
        // user session
      } else {
        console.log('Incorrect password');
      }
    } else {
      console.log('User not found');
    }
  } catch (err) {
    console.log(err.message);
  }
};


exports.LogoutUser=(req, res)=>{
  req.session.destroy();
  //Session'ı yok edip alt kodda da anasayfaya gönderiyoruz
  res.redirect('/');
}
exports.getDashboardPage= async (req, res) =>{
  const user=await User.findOne({_id:req.session.userID}).populate('courses');
  //Useri gönderdik
  const categories=await Category.find();

  const courses=await Course.find({user:req.session.userID});
  res.status(200).render('dashboard',{pageName: 'dashboard',user,categories,courses});
}