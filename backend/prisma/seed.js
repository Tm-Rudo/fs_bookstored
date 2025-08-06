
const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker')

const prisma = new PrismaClient();

async function main() {
    console.log(" Gửi yêu cầu tạo dữ liệu mẫu...");

    //tạo danh mục mẫu
    const categoryNames = ['Trinh thám', 'Khoa học viễn tưởng', 'Văn học', 'Manga', 'Tâm lý học'];
    const categories = [];

    for (let name of categoryNames) {
        const cat = await prisma.category.create({
            data: {
                name,
                description: faker.lorem.sentence(),

            }
        })
        categories.push(cat);
    }

    //tạo sách mẫu
    for (let i = 0; i < 20; i++) {
        await prisma.book.create({
            data: {
                title: faker.lorem.words(3),
                author: faker.person.fullName(),
                description: faker.lorem.paragraph(),
                publishedDate: faker.date.past(),
                imageUrl: faker.image.urlPicsumPhotos(),
                price: faker.number.float({ min: 1000, max: 10000 }),
                categoryId: faker.helpers.arrayElement(categories).id,
                stock: faker.number.int({ min: 0, max: 10000 }),
                createdAt: faker.date.past(),
            }
        })
    }

    // tạo người dùng mẫu
    for (let i = 0; i < 10; i++) {
        await prisma.user.create({
            data: {
                username: faker.internet.username(),
                password: faker.internet.password(),
                phone: faker.phone.number(),
                email: faker.internet.email(),
                role: faker.helpers.arrayElement(['admin', 'user']),

            }
        })
    }

    // Tạo đánh giá (review) mẫu
    const users = await prisma.user.findMany();
    const books = await prisma.book.findMany();

    for (let i = 0; i < 15; i++) {
        await prisma.review.create({
            data: {
                rating: faker.number.int({ min: 1, max: 5 }),
                comment: faker.lorem.sentence(),
                userId: faker.helpers.arrayElement(users).id,
                bookId: faker.helpers.arrayElement(books).id,
            },
        });
    }

    //thông báo
    console.log("Dữ liệu mẫu đã được tạo thành công!");
}

main().catch((e) => {
    console.error("Lỗi khi tạo dữ liệu mẫu:", e);
}).finally(async () => {
    await prisma.$disconnect();
    console.log("Đã ngắt kết nối với cơ sở dữ liệu.");
})

