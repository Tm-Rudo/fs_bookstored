
//
const express = require('express');
const cors = require('cors');
const {PrismaClient} = require('@prisma/client');
const dotenv = require('dotenv')
//nạp biến môi trường từ file .env
dotenv.config();

//khởi tạo ứng dựng press
const app = express();
// const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());

const bookRoutes = require('./routes/books');
const categoryRoutes = require('./routes/categories');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/role/users')
const adminRoutes = require('./routes/role/admin')


//
app.use(express.json());

//đăng ký các route 
//----------------Sách-------------------

app.use('/api/books', bookRoutes);


//----------------danh mục--------------------
//lấy tất cả danh mục
app.use('/api/categories', categoryRoutes);

//-----------------đăng nhập, đăng ký-------------------\
app.use('/api/auth', authRoutes);

//-----------------user-------------------
app.use('/api/users', userRoutes);
//-----------------admin-------------------
app.use('/api/admin', adminRoutes);






//chạy
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})