const Category = require('../models/Category');
//Course modelimizi çağırdık

exports.CreateCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      status: 'success',
      category,
      
    });
    console.log(`${category.name} created successfully`);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error:err.message,
    });
    console.log(`${err.message}`);
  }
};