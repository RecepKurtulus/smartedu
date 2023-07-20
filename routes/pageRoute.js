const express = require('express');
const pageController = require('../controllers/pageController');
const authMiddleware = require('../middlewares/authMiddleware');
const router=express.Router();
router.route('/').get(pageController.getIndexPage);
//Eğer sana index isteği geldiyse pagecontroller'a git getindexpage'i çalıştır
router.route('/about').get(pageController.getAboutPage);
//Eğer sana about isteği geldiyse pagecontroller'a git getaboutpage'i çalıştır
router.route('/register').get(authMiddleware.registerMiddleware,pageController.getRegisterPage);
//Eğer sana register isteği geldiyse pagecontroller'a git getregisterpage'i çalıştır
router.route('/login').get(authMiddleware.loginMiddleware,pageController.getLoginPage);
//Eğer sana login isteği geldiyse pagecontroller'a git getloginpage'i çalıştır



module.exports = router;
//router modülünü export ettik app.js'de kullanmak için



