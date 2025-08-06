//import
const express = require('express');
const router = express.Router();
//
const userController = require('../../controllers/userController');
const authMiddleware = require('../../middleware/authMiddleware');
const checkRole = require('../../middleware/checkRole');

//router cho admin
router.get('/', authMiddleware.verifyToken, checkRole.isAdmin, userController.getAllUsersByAdmin);
router.get('/:id', authMiddleware.verifyToken, checkRole.isAdmin, userController.getUsersByIdAdmin);
router.put('/:id', authMiddleware.verifyToken, checkRole.isAdmin, userController.updateUserByAdmin);
router.delete('/:id', authMiddleware.verifyToken, checkRole.isAdmin, userController.deleteUserByAdmin);
router.post('/', authMiddleware.verifyToken, checkRole.isAdmin, userController.createAdmin);

module.exports = router;