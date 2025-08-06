
// Bảo vệ route khi gọi API (chỉ user đã login mới gọi được)
const jwt = require('jsonwebtoken');

// Middleware để xác thực token
exports.verifyToken = (req , res , next) =>{
    // Lấy token từ header Authorization
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: 'Không có token hoặc token không hợp lệ'});
    }

    // Lấy token từ header
    const token = authHeader.split(' ')[1];

    //kiểm tra token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Lưu thông tin người dùng vào req.user
        req.user = decoded;
        next(); // Tiếp tục xử lý request
    } catch (error) {
        return res.status(403).json({message:'token k hợp lệ hoặc hết hạn'})
    }
}

