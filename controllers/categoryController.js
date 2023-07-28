const Category = require('../models/Category');
//Course modelimizi çağırdık

exports.CreateCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    req.flash('success',`${category.name} created successfully`);
    res.status(201).redirect('/user/dashboard');
    
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error:err.message,
    });
    console.log(`${err.message}`);
  }
};
exports.DeleteCategory = async (req, res) => {
  try {    

    const category =await Category.findByIdAndRemove(req.params.id)
    req.flash('error',`${category.name} deleted successfully`);
    res.status(200).redirect('/user/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};