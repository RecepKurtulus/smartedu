const express = require('express');
const courseController = require('../controllers/courseController');
const router=express.Router();
router.route('/createCourse').post(courseController.CreateCourse);
//http://localhost:3000/courses post req geldiği zaman CreateCourse çalıştırıcak
router.route('/').get(courseController.GetAllCourses);
//http://localhost:3000/courses/listcourses get req geldiği zaman GetAllCourses çalıştırıcak
router.route('/:slug').get(courseController.GetSingleCourse);

module.exports = router;
//router modülünü export ettik app.js'de kullanmak için



