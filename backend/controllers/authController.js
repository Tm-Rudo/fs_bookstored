
// import thư viện
const {PrismaClient} = require('@prisma/client');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// khởi tạo PrismaClient
const prisma = new PrismaClient();

//đăng kí
exports.register = async(req , res) =>{
    //lấy dữ liệu từ body
    const {username, password, phone, email} = req.body;

    try {
        //kiểm tra người dùng tồn tại chưa 
        const existingUser = await prisma.user.findUnique({
            where:{username}
        });
        if(existingUser){
            return res.status(400).json({
                message: 'Người dùng đã tồn tại'
            })
        }

        //mã hóa mật khẩu
        const hashedPassword = await brcypt.hash(password, 10);

        //tạo người dùng mới
        const newUser = await prisma.user.create({
            data:{
                username,
                password: hashedPassword,
                phone,
                email,
                role: 'user' //mặc định là user
            }
        })
        //trả về thông tin người dùng
        res.status(201).json({message:"đăng kí thành công",
            user: {
                id: newUser.id,
                username: newUser.username,
                phone: newUser.phone,
                email: newUser.email,
                role: newUser.role
            }
        })
    } catch (error) {
        res.status(500).json({message: "Đã xảy ra lỗi", error: error.message})
    }
}

//đăng nhập
exports.login = async(req, res) =>{
    //lấy dữ liệu từ body
    const {username, password} = req.body;
    //
    try {
        //kiểm tra người dùng tồn tại
        const user = await prisma.user.findUnique({
            where: {username}
        })
        //
        if(!user){
            return res.status(404).json({message: "người dùng không tồn tại"})
        }

        //kiểm tra mật khẩu
        const isPasswordValid = await brcypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(404).json({message: "Mật khẩu không đúng"})
        }

        //tạo token jwt
        const token = jwt.sign({
            id: user.id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRES_IN || '7d' // thời gian hết hạn token
        })
        //trả về thông tin người dùng và token
        res.status(200).json({message:"Đăng nhập thành công",
            token: token
        }
            
        )
    } catch (error) {
        res.status(500).json({message: "Đã xảy ra lỗi", error: error.message})
    }
}

//