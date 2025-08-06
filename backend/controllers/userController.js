
//import thư viện
const {PrismaClient} = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//khởi tạo prisma client
const prisma = new PrismaClient();

// -----------chức năng cho user /api/users/me
//hàm xem thông tin người dùng get
exports.getUserInfo = async(req ,  res) =>{
    try {
        //lấy thông tin từ token => để biết ai đang đăng nhập
        const userId = req.user.id;
        const userInfo = await prisma.user.findUnique({
            where:{
                id: userId
            },
            select:{
                username: true,
                email: true,
                phone: true,
                role: true
            }
        });
        //trả về thông tin người dùng
        res.status(200).json({message:' lấy thông tin người dùng thành công', userInfo});
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:',error);
        res.status(500).json({message: 'Lỗi khi lấy thông tin người dùng'});
        
    }
}

//cập nhật thông tin người dùng put
exports.updateUserInfo = async(req, res) =>{
    try {
        //lấy thôgn tin từ token
        const userId = req.user.id;
        //lấy thông tin từ body
        const {username, email, phone, password} = req.body;
        //
        const dataToUpdate = {
      username,
      email,
      phone,
    };
// chỉ hash và thêm vào nếu có password mới
    if (password) {
      const hashPass = await bcrypt.hash(password, 10);
      dataToUpdate.password = hashPass;
    }
        //cập nhật thông tin người dùng
        const updateUser = await prisma.user.update({
            data: {
                ...dataToUpdate
            },
            where: {
                id: userId
            }
        })
        //trả về thông tin
        res.status(200).json({message:"cập nhật thông tin người dùng thành công", updateUser})
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin người dùng", error);
        res.status(500).json({message:"Lỗi khi cập nhật thông tin "})
    }
}

//xóa người dùng delete
exports.deleteUser = async(req, res) =>{
    try {
        //lấy id từ token
        const userId = req.user.id;
        //xóa người dùng
        const delUser = await prisma.user.delete({
            where:{
                id: userId
            }
        })
        //trả về thông tin
        res.status(200).json({message:"Xóa thông tin thành công", delUser});
    } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
        res.status(500).json({message:"Lỗi khi xóa người dùng"})
    }
}

//------------chức năng của admin /api/users/

//lấy danh sách người dùng
exports.getAllUsersByAdmin = async (req, res) =>{
    try {
        //lấy danh sách người dùng
        const users = await prisma.user.findMany({
            select:{
                id: true,
                username: true,
                // password: false,
                email: true,
                phone: true,
                role: true
            }
        })
        //trả kq
        res.json({message:"Lấy danh sách người dùng thành công", users});
    } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        res.status(500).json({message:"Lỗi khi lấy danh sách người dùng"});
    }
}

//lấy thông tin người dùng theo id
exports.getUsersByIdAdmin = async (req, res) =>{
    try {
        //lấy id từ params
        const {id} = req.params;
        //lấy thông tin người dùng theo id
        const updateByIdAdmin = await prisma.user.findUnique({
            where:{
                id: parseInt(id)
            },
            select:{
                id: true,
                username: true,
                email: true,
                phone: true,
                role: true
            }
        })
        //kiểm tra xem có người dùng không
        if(!updateByIdAdmin){
            return res.status(404).json({message:"Người dùng không tồn tại"});
        }
        res.status(200).json({message:"Lấy thông tin người dùng thành công", user: updateByIdAdmin});
    } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        res.status(500).json({message:"Lỗi khi lấy thông tin người dùng"});
    }
}

//cập nhật nguời dùng
exports.updateUserByAdmin = async (req, res) =>{
    try {
        const {id} = req.params; //lấy id từ params
        const {username, email, phone,role} = req.body; //lấy thông tin từ body
        //cập nhật người dùng
        const updateUserByAdmin = await prisma.user.update({
            data:{
                username,
                // password,
                email,
                phone,
                role
            },
            where:{
                id: parseInt(id) // chuyển đổi id sang kiểu số nguyên
            }
        })
        //trả tt
        res.json({message:"Cập nhật người dùng thành công", user: updateUserByAdmin});
    } catch (error) {
        console.error("Lỗi khi cập nhật người dùng:", error);
        res.status(500).json({message:"Lỗi khi cập nhật người dùng"});
    }
}

//xóa người dùng
exports.deleteUserByAdmin = async (req, res) =>{
    try {
        //lấy id từ params
        const {id} = req.params;
        //xóa người dùng
        const delUserByAdmin = await prisma.user.delete({
            where:{
                id: parseInt(id)
            }
        })
        res.json({message:"Xóa người dùng thành công", user: delUserByAdmin});
    } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
        res.status(500).json({message:"Lỗi khi xóa người dùng"});
    }
}


//---------sau này update thêm tạo user---------
//tạo admin
exports.createAdmin = async (req, res) =>{
   try {
     const {username, email, phone, password} = req.body; //lấy thông tin từ body
     //ktra thông tin đầu vào
     if(!username || !password){
        return res.status(400).json({message:"Tên đăng nhập và mật khẩu là bắt buộc"});
     }
     //mã hóa mk
     const hashedPassword = await bcrypt.hash(password, 10);
     //tạo admin mới
     const newAdmin = await prisma.user.create({
        data:{
            username,
            email,
            phone, 
            password: hashedPassword,
            role: 'admin'
        }
     })
        //trả về thông tin admin mới
        res.status(201).json({message:"Tạo admin thành công", admin: newAdmin});
   } catch (error) {
       console.error("Lỗi khi tạo admin:", error);
       res.status(500).json({message:"Lỗi khi tạo admin"});
    
   }

}
// exports.createAdmin = createAdmin;