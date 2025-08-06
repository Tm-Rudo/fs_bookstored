
//check xem phải admin k
const jwt = require('jsonwebtoken');

//
exports.isAdmin = (req ,  res , next) =>{
    if(req.user?.role !== 'admin'){
        return res.status(403).json({message: 'bạn không có quyền truy cập vào tài nguyên này'});
    }
    next(); // Nếu là admin, tiếp tục xử lý request
}