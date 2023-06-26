const User = require('../models/User');
const bcrypt = require('bcrypt');
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
    
    if (user) {
      const same = await bcrypt.compare(password, user.password);
      
      if (same) {
        res.status(200).send(`YOU ARE LOGGED IN ${user.name}`);
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