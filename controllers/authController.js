const User = require('../models/User');
const bcrypt = require('bcrypt');
const session=require('express-session');
//Course modelimizi çağırdık

exports.CreateUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      user,
      
    });
    console.log(`${user.name} created successfully`);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error:err.message,
    });
    console.log(`${err.message}`);
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
        
        res.status(200).redirect('/');
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
  res.redirect('/');
}