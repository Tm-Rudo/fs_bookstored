
//import
const {PrismaClient} = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();



//exports từng hàm controller
// lấy tất cả danh mục
exports.getAllCategories = async (req , res) =>{
    try {
        //lấy dữ liệu từ db
        const categories = await prisma.category.findMany({
            // include:{
            //     books: true, // bao gồm thông tin danh mục + sách con nếu có
            // }
        })
        //trả về kết quả
        res.json(categories);

    } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
        //trả mã lỗi
        res.status(500).json({
            error: "Lỗi server khi lấy danh mục"
        })
        
    }
}

//thêm danh mục mới
exports.addCategory = async (req, res) =>{
    const {name, description} = req.body;
    try {
        //kiểm tra dữ liệu đầu vào
        if(!name){
            return res.status(400).json({error:"Tên danh mục là bắt buộc"})
        }

        //thêm dm vào db
        const newCategory = await prisma.category.create({
            data:{
                name, 
                description
            }
        })
        //trả về kết quả
        res.status(201).json({message: "Thêm danh mục thành công", category: newCategory});
    } catch (error) {
        console.error("Lỗi khi thêm mới danh mục: ", error);
        //trả mã lỗi
        res.status(500).json({
            error: "Lỗi server khi thêm danh mục"
        })
        
    }
}

//sửa dm
exports.editCategory = async (req, res) =>{
    //lấy id từ params
    const {id} = req.params;
    //lấy dữ liệu từ body
    const {name, description} = req.body;
    try {
        //kiểm tra dữ liệu đầu vào
        if(!name){
            //trả lỗi 
            return res.status(400).json({error:"Tên danh mục là bắt buộc"});
        }
        //cập nhật danh mục
        const updatedCategory = await prisma.category.update({
            data:{
                name,
                description
            },
            where:{
                id: parseInt(id) // chuyển đổi id sang kiểu số nguyên
            }
        })
        // trả về kq
        res.json({message:"Cập nhật thành công", category: updatedCategory});

    } catch (error) {
        console.error("Lỗi khi cập nhật danh mục: ", error);
        //trả mã lỗi
        res.status(500).json({
            error: "Lỗi server khi cập nhật danh mục"
        })
    }
}

//xóa dm
exports.deleteCategory = async (req, res) =>{
    // lấy id từ params
    const {id} = req.params;
    try {
        //
        const delCategory = await prisma.category.delete({
            where:{
                id: parseInt(id) // chuyển đổi id sang kiểu số nguyên
            }
        })
        //trả về kết quả
        res.json({message:"Xóa dm thành công", category: delCategory})
    } catch (error) {
        console.error("Lỗi khi xóa dm:", error);
        res.status(500).json({error:"Lỗi khi xóa dm"})
    }
}