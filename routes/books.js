const express = require('express');
const app = express();
const router = express.Router();
const Book = require('../models/book')
const Author = require('../models/author')
// const multer = require('multer');
// const upload = require("express-fileupload")
const path = require('path');
const fs = require('fs');
const uploadPath = path.join("public", Book.coverImageBasePath)
// const imageMimeType = ["image/jpeg","image/jpg","image/png", "image/gif"]
// All Books Routes
router.get("/",async(req,res)=>{
    const books = await Book.find()
    // res.send(books[1].coverImagePath)
    res.render("books/index",{books : books})
})
// New Book Route
router.get("/new" , async(req,res)=>{
    renderNewPage(res, new Book())
})
// Create Book Route
router.post("/", async(req,res)=>{
    let file = req.files
    if(file != null){
        // res.redirect("/books/new")
        const fileName = req.files.cover
        console.log(fileName.mv)
        fileName.mv(uploadPath+fileName.name, function(err){
            if(err){
                console.log("it have error")
            }else{
                console.log("successful saving")
            }
        })
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            publishDate:new Date(req.body.publishDate),
            pageCount: req.body.pageCount,
            description: req.body.description,
            coverImageName : fileName.name
        })
        try {
            const newBook = await book.save()
            res.redirect("/books")
        } catch(err) {
            if(err)
            res.redirect("/books/new")
        }
    }else{
        res.redirect("/books/new")
    }
})


function removeBookCover (fileName){
    fs.unlink(path.join(uploadPath, fileName),err=>{
        if(err) console.error(err)
    })
}

async function renderNewPage(res, book, hasError=false){
    try {
        const authors = await Author.find({})
        const params = {
            authors: authors,
            book:book
        }
        if(hasError) params.errorMesage = "Error Creating Book"
        res.render("books/new",params )
    } catch {
        res.redirect("/books")
    }
}

module.exports = router;