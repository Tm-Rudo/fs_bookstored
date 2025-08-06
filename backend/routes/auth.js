// import thư viện
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


//đăng kí
router.post('/register', authController.register);

//đăng nhập
router.post('/login', authController.login);

//export router
module.exports = router;