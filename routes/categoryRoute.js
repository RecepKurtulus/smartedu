const express = require('express');
const categoryController = require('../controllers/categoryController');
const router=express.Router();
router.route('/createCategory').post(categoryController.CreateCategory);
//http://localhost:3000/categories/createCategory post req geldiği zaman CreateCatagory çalıştırıcak

module.exports = router;
//router modülünü export ettik app.js'de kullanmak için



