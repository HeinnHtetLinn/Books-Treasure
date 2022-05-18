const express = require('express');
const router = express.Router();
const Book = require('../models/book')
const Author = require('../models/author')
// const multer = require('multer');
// const upload = require("express-fileupload")
// const path = require('path');
// const fs = require('fs');
// const uploadPath = path.join("public", Book.coverImageBasePath)
// const imageMimeType = ["image/jpeg","image/jpg","image/png", "image/gif"]
// All Books Routes
router.get("/",async(req,res)=>{
    let query = Book.find().populate("author")
    if(req.query.title != null && req.query.title !== "" ){
        query =  query.regex("title", new RegExp(req.query.title,"i"))
    }
    try {
        const books = await query.exec()
        res.render("books/index",{books : books, searchOptions: req.query})
    } catch (error) {
        res.redirect("/")
    }
})
// New Book Route
router.get("/new" , async(req,res)=>{
    renderNewPage(res, new Book())
})
// Create Book Route
router.post("/", async(req,res)=>{
    let body = req.body.cover
    // res.send(coverImage)
    
    if(body != null){
        // res.redirect("/books/new")
        const file = JSON.parse(body)
        const coverImage = new Buffer.from(file.data, "base64")
        
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            publishDate:new Date(req.body.publishDate),
            pageCount: req.body.pageCount,
            description: req.body.description,
            coverImage:coverImage,
            coverImageType:file.type
        })
        // console.log(book)
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
// Show Books
router.get("/:id",async(req,res)=>{
    try {
        const book = await Book.findById(req.params.id).populate('author').exec()
        res.render("books/show",{book : book})
    } catch{
        res.redirect("/")
    }
})


// Get Book id 
router.get("/:id/edit", async(req,res)=>{
    try{
        const authors = await Author.find()
        const book = await Book.findById(req.params.id)
        res.render("books/edit",{book : book, authors:authors})
    }catch{
        res.redirect("/")
    }
})
// Update Book 
router.put("/:id", async(req,res)=>{
    let book
    let body = req.body.cover
    
    if(body != null){
        const file = JSON.parse(body)
        const coverImage = new Buffer.from(file.data, "base64")
        
        book = await Book.findById(req.params.id)
        book.title = req.body.title,
        book.author = req.body.author,
        book.publishDate = new Date(req.body.publishDate),
        book.pageCount = req.body.pageCount,
        book.description = req.body.description,
        book.coverImage = coverImage,
        book.coverImageType = file.type
        
    }
    try{
        await book.save()
        res.redirect(`/books/${book.id}`)
    }catch{
        if(book == null){
            res.redirect(`/books/${book.id}/edit`)
        }else{
            res.redirect("/")
        }
    }
        
})

// Delete Route
router.delete("/:id",async(req,res)=>{
    let book
    try{
        book = await Book.findById(req.params.id)
        await book.remove()
        res.redirect(`/books/`)

    }catch{
        if(book == null){
            res.redirect(`/books/${book.id}`)
        }else{
            res.redirect("/books")
        }
    }
})

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