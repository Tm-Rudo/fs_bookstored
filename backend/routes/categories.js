// express
const express = require('express');
const router = express.Router();
//import controller
const categoriesController = require("../controllers/categoryController");
const {verifyToken} = require('../middleware/authMiddleware');
const {isAdmin} = require('../middleware/checkRole')


//định nghĩa các routes cho danh mục
//lấy tất cả danh mục: user admin
router.get('/', categoriesController.getAllCategories);


//--------------chức năng cho admin có thể thực hiện
//thêm danh mục mới
router.post('/',verifyToken, isAdmin, categoriesController.addCategory);

//sửa dm
router.put('/:id',verifyToken, isAdmin, categoriesController.editCategory);

//xóa dm
router.delete('/:id',verifyToken, isAdmin, categoriesController.deleteCategory);






//export router
module.exports = router;