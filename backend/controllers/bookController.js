
// import
const {PrismaClient} = require('@prisma/client');
const express = require('express');

//tạo kết nối Prisma
const prisma = new PrismaClient();

//exports từng hàm controller




//lấy tất cả danh sách
exports.getAllBooks = async (req, res) => {
    const { title, author, category } = req.query;

    // Tạo object điều kiện where
    const whereInput = {};

    if (title) {
        whereInput.title = {
            contains: title,
            mode: 'insensitive' // không phân biệt hoa thường
        };
    }

    if (author) {
        whereInput.author = {
            contains: author,
            mode: 'insensitive'
        };
    }

    if (category) {
        whereInput.category = {
            name: {
                contains: category,
                mode: 'insensitive'
            }
        };
    }

    try {
        const books = await prisma.book.findMany({
            where: Object.keys(whereInput).length ? whereInput : undefined,
            include: {
                category: true
            }
        });


        res.json(books);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
        res.status(500).json({ error: "Lỗi server" });
    }
};


//lấy danh sách theo tên sách , tác giả và thể loại
// exports.getBookByFilter = async (req, res) =>{
//     //tạo biến để phân trang
// // const page = parseInt(req.query.page) || 1; // trang hiện tại, mặc định là 1
// // const limit = parseInt(req.query.limit) || 10; // số lượng sách mỗi trang, mặc định là 10
// // const skip = (page - 1) * limit; // số lượng sách cần bỏ qua
//     //lấy id từ tham số
//     const {title, author, category} = req.query;

//     //tạo điều kiện tìm kiếm
//     const whereInput = {};

//     //kiểm tra nếu có title
//     if(title){
//         whereInput.title = {
//             contains: title, // tìm kiếm chứa chuỗi title
//             mode: 'insensitive', // không phân biệt chữ hoa thường
//         }
//     }
//     //kiểm tra nếu có author
//     if(author){
//         whereInput.author = {
//             contains: author, //tìm chuỗi author
//             mode: 'insensitive', // không phân biệt chữ hoa thường
//         }
//     }

//     //kiểm tra nếu có category
//     if(category){
//         whereInput.category = {
//             name:{
//                  contains : category, // tìm chuỗi category
//                  mode: 'insensitive', // không phân biệt chữ hoa thường
//             }
          
//         }
//     }

//     try {
//         // lấy dữ liệu từ db
//         const book = await prisma.book.findMany({
//             where: whereInput, // áp dụng điều kiện tìm kiếm
//             // skip: skip, // bỏ qua số lượng sách đã tính toán
//             // take: limit, // lấy số lượng sách theo giới hạn
//             include: {
//                 category: true, // bao gồm thông tin danh mục
//             }
//         })
//         //kiểm tra nếu không tìm thấy sách
//         if(!book){
//             return res.status(404).json({error:"Sách không tồn tại"});
//         }
//         res.json(book);
        
//     } catch (error) {
//         console.error("Lỗi khi lấy sách:", error);
//         res.status(500).json({error:"Lỗi server"})
        
//     }
// }


//admin thêm sách
exports.addBook = async(req, res) =>{
    //lấy dữ liệu từ body
    const {title, author, categoryId, price, description, stock, publishedDate, imageUrl} = req.body;
    //kiểm tra dữ liệu
    if(!title || !author || !categoryId || !price || !stock ||!imageUrl || !publishedDate){
        return res.status(400).json({error: "Thiếu thông tin bắt buộc"})
    }

    // kiểm tra categoryId có tồn tại trong db không
    const categoryExists = await prisma.category.findUnique({
        where:{
            id: categoryId, // kiểm tra theo id
        }
    })
    // không tồn tại thì báo lỗi
    if(!categoryExists){
        return res.status(404).json({error: "Danh mục không tồn tại"});
    }

    //

let finalPublishedDate = null;

//  Xử lý chuỗi đầu vào
if (publishedDate) {
    // Kiểm tra xem chuỗi có phải chỉ là 4 chữ số (năm) hay không
    if (/^\d{4}$/.test(publishedDate)) {
        // Nếu chỉ là NĂM -> Mặc định là ngày 1 tháng 1 của năm đó
        finalPublishedDate = new Date(`${publishedDate}-01-01`);
    } else {
        // Nếu là NGÀY-THÁNG-NĂM đầy đủ -> Cứ để JavaScript tự chuyển đổi
        // new Date() rất linh hoạt, nó có thể hiểu "2023-05-15", "May 15, 2023", v.v.
        finalPublishedDate = new Date(publishedDate);
    }

    // Kiểm tra xem date sau khi chuyển đổi có hợp lệ không
    if (isNaN(finalPublishedDate.getTime())) {
        return res.status(400).json({ error: "Định dạng ngày tháng không hợp lệ." });
    }
}


    try {
        //thêm sách vào db
        const newBook = await prisma.book.create({
            data:{
                title,
                author,
                categoryId, 
                price: parseFloat(price), // chuyển đổi giá thành số
                description,
                stock: parseInt(stock), // chuyển đổi số lượng thành số nguyên
                publishedDate: finalPublishedDate, // sử dụng ngày đã xử lý
                imageUrl, // thêm trường hình ảnh
            }
        })
        //trả về kết quả
       res.status(201).json({ message: "Thêm sách thành công", book: newBook });
    } catch (error) {
        console.error("Lỗi thêm mới sách", error);
        res.status(500).json({error:"Lỗi server"})
        
    }
   
}

//cập nhật sách
exports.updateBook = async (req, res) =>{
    // lấy id
    const {id} = req.params;
    //lấy dữ liệu từ body
    const {title, author, categoryId, price, description, stock, publishedDate, imageUrl} = req.body;
    //kiểm tra
    if(!title || !author || !categoryId || !price || !stock ||!imageUrl || !publishedDate){
        return res.status(400).json({error: "Thiếu thông tin bắt buộc"})
    }
    //kiểm tra categoryId có tồn tại trong db k
    const categoryExists = await prisma.category.findUnique({
        where:{
            id: categoryId, //kiểm tra
        }
    })
    //nếu không tồn tại thì báo lỗi
    if(!categoryExists){
        return res.status(404).json({error: "Danh mục không tồn tại"});
    }

    // Xử lý chuỗi đầu vào
let finalPublishedDate = null;
    if (publishedDate) {
    // Kiểm tra xem chuỗi có phải chỉ là 4 chữ số (năm) hay không
    if (/^\d{4}$/.test(publishedDate)) {
        // Nếu chỉ là NĂM -> Mặc định là ngày 1 tháng 1 của năm đó
        finalPublishedDate = new Date(`${publishedDate}-01-01`);
    } else {
        // Nếu là NGÀY-THÁNG-NĂM đầy đủ -> Cứ để JavaScript tự chuyển đổi
        // new Date() rất linh hoạt, nó có thể hiểu "2023-05-15", "May 15, 2023", v.v.
        finalPublishedDate = new Date(publishedDate);
    }

    // Kiểm tra xem date sau khi chuyển đổi có hợp lệ không
    if (isNaN(finalPublishedDate.getTime())) {
        return res.status(400).json({ error: "Định dạng ngày tháng không hợp lệ." });
    }
}

    try {
        //cập nhật sách trong db
        const updateBook = await prisma.book.update({
            where: {
                id: parseInt(id), // chuyển đổi id thành số nguyên
            },
            data:{
                title, 
                author,
                categoryId,
                price: parseFloat(price), // chuyển đổi giá thành số
                description,
                stock: parseInt(stock), // chuyển đổi số lượng thành số nguyên
                publishedDate: finalPublishedDate, // sử dụng ngày đã xử lý        
                imageUrl, // thêm trường hình ảnh        
            }
        })
        //trả về kết quả
        res.json({ message: "Cập nhật sách thành công", book: updateBook });
        
    } catch (error) {
        if (error.code === 'P2025') {
        return res.status(404).json({ error: "Sách không tồn tại để sửa." });
    }
         console.error("Lỗi sửa sách", error);
        res.status(500).json({ error: "Lỗi server" });
        
    }

}

//xóa sách theo id
exports.deleteBook = async (req, res) =>{
    //lấy id từ tham số
    const {id} = req.params;
    try {
        //xóa sách trong db
        const deleteBook = await prisma.book.delete({
            where:{
                id: parseInt(id), // chuyển đổi id thành số nguyên
            }
        })
        //kiểm tra nếu không tìm thấy sách
        if(!deleteBook){
            return res.status(404).json({error:"Sách không tồn tại"});
        }
        //trả về kết quả
        res.json({message:"Xóa sách thành công", book:deleteBook});
        
    } catch (error) {
       if (error.code === 'P2025') {
        return res.status(404).json({ error: "Sách không tồn tại để xóa." });
    }
        console.error("Lỗi xóa sách", error);
        res.status(500).json({ error: "Lỗi server" });
    }
}