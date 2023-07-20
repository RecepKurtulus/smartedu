const express = require('express');
const courseController = require('../controllers/courseController');
const rolesMiddleware = require('../middlewares/rolesMiddleware');
const router=express.Router();
router.route('/createCourse').post(rolesMiddleware(['Teacher','Admin']),courseController.CreateCourse);
//Roles middleware'a bak eğer gelen req.body bilgisinde role bölümü teacher veya adminse kursu oluştur
//http://localhost:3000/courses post req geldiği zaman CreateCourse çalıştırıcak
router.route('/').get(courseController.GetAllCourses);
//http://localhost:3000/courses/listcourses get req geldiği zaman GetAllCourses çalıştırıcak
router.route('/:slug').get(courseController.GetSingleCourse);

router.route('/enrollCourse').post(courseController.EnrollCourse);
router.route('/releaseCourse').post(courseController.ReleaseCourse);
module.exports = router;
//router modülünü export ettik app.js'de kullanmak için



