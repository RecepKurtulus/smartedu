const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router=express.Router();
router.route('/signup').post(authController.CreateUser);
//http://localhost:3000/users/signup post req geldiği zaman CreateUser çalıştırıcak
router.route('/signin').post(authController.LoginUser);
//http://localhost:3000/users/signin post req geldiği zaman LoginUser çalıştırıcak
router.route('/signout').get(authController.LogoutUser);
//http://localhost:3000/users/logout post req geldiği zaman LogoutUser çalıştırıcak

router.route('/dashboard').get(authMiddleware.dashBoardMiddleware,authController.getDashboardPage);
//Eğer sana dashboard isteği geldiyse pagecontroller'a git getdashboardpage'i çalıştır

module.exports = router;
//router modülünü export ettik app.js'de kullanmak için



