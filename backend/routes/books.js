
// express
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const {verifyToken} = require('../middleware/authMiddleware');
const {isAdmin} = require('../middleware/checkRole')

//lấy tất cả sách: ai cũng xem đc
router.get('/', bookController.getAllBooks);
// console.log('bookController.getAllBooks =', bookController.getAllBooks);

//lấy sách theo id
// router.get('/', bookController.getBookByFilter);

//---------chức năng admin có thể làm
//thêm sách mới
router.post('/',verifyToken, isAdmin, bookController.addBook);

//cập nhật sách theo id
router.put('/:id',verifyToken, isAdmin, bookController.updateBook);

//xóa sách theo id
router.delete("/:id",verifyToken, isAdmin, bookController.deleteBook);





//xuất router
module.exports = router;