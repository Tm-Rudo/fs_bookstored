const {PrismaClient} = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    const adminPassword = await bcrypt.hash('admin', 10);
    const userPassword = await bcrypt.hash('user', 10);

    //tạo tk admin
    const admin = await prisma.user.create({
        data:{
            username: 'admin',
            password: adminPassword,
            email: 'admin@gmail.com',
            phone: '0123456789',
            role:'admin'
        }
    });

    //tạo tk user
    const user = await prisma.user.create({
        data:{
            username: 'user',
            password: userPassword,
            email:'user@gmail.com',
            phone: '0112345678',
            role: 'user'
        }
    })
    console.log('Tài khoản admin và user đã được tạo thành công');

}

// Chạy hàm main
main()
.catch((e) => console.error(e))
.finally(() => prisma.$disconnect());