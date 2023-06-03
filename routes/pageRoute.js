const express = require('express');
const pageController = require('../controllers/pageController');
const router=express.Router();
router.route('/').get(pageController.getIndexPage);
//Eğer sana index isteği geldiyse pagecontroller'a git getindexpage'i çalıştır
router.route('/about').get(pageController.getAboutPage);
//Eğer sana about isteği geldiyse pagecontroller'a git getaboutpage'i çalıştır

module.exports = router;
//router modülünü export ettik app.js'de kullanmak için



