const express = require('express');
const router = express.Router();
const Author = require('../models/author')
const Book = require('../models/book')
// All Author Routes
router.get("/",async(req,res)=>{
    let search = {}
    if(req.query.name != null && req.query.name !== "" ){
        search.name = new RegExp(req.query.name, "i")
    }
    try{
        const authors = await Author.find(search)
        res.render("authors/index",{authors : authors, search:req.query})
    }catch{
        res.redirect("/")
    }
})
// New Author Route
router.get("/new" , (req,res)=>{
    
    res.render("authors/new", {author : new Author()})
})
// Create Author Route
router.post("/", async(req,res)=>{
    let body = req.body.profile
    // res.send(coverImage)
    
    if(body != null){
        // res.redirect("/books/new")
        const file = JSON.parse(body)
        const profile = new Buffer.from(file.data, "base64")

    const author = new Author({
        name : req.body.name,
        email:req.body.email,
        password:req.body.password,
        profileImage:profile,
        profileImageType:file.type
    })
    try{
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect("authors") 
    }catch{
        res.render("authors/new",{
            author:author,
            errorMessage:'Error Creating Author'
        })
    }}
})
router.get("/login", async(req,res)=>{
    res.render("authors/login")
})
// Login Route
router.post("/login", async(req,res)=>{
    const user = req.body
    // console.log(user.email)
    const correct = await Author.findOne({email:user.email})
    try {
        if(correct && correct.password === user.password){
            res.redirect("/author/show")
        }else{
            res.render("authors/login",{
                error:"You must register first"
            })
        }
        
    } catch {
        res.redirect("authors/login")
    }
})
// Edit Author Route
router.get("/:id/edit", async(req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        res.render("authors/edit",{author:author})
    } catch {
        res.redirect("/authors")
    }
})

// Update Author Route
router.put("/:id", async(req,res)=>{
    let author
    let body = req.body.profile
    
    if(body != null){
        const file = JSON.parse(body)
        const profile = new Buffer.from(file.data, "base64")}

    try{
        author = await Author.findById(req.params.id)
        author.name = req.body.name
        author.password = req.body.password
        author.profileImage = profile
        author.email = req.body.email
        author.profileImageType = file.type
        
        await author.save()
        res.redirect(`/authors`)
    }catch{
        if(author == null){
            res.redirect("/")
        }else{
            res.render("author/edit",{
                author:author,
                errorMessage:"Error Updating Author"
            })
        }
    }
})
// Get and show one Id Route
router.get("/:id", async(req,res)=>{
    try{
        const author = await Author.findById(req.params.id)
        const book = await Book.find({author:author.id}).limit(6).populate("author").exec()
        res.render("authors/show",{
            author:author,
            booksByAuthor:book
        })
    }catch{
        res.redirect("/")
    }
})

// Delete Route
router.delete("/:id",async(req,res)=>{
    let author
    try{
        author = await Author.findById(req.params.id)
        await author.remove()
        res.redirect("/authors")
    }catch{
        if(author==null){
            res.redirect("/")
        }else{
            res.redirect(`/authors/${author.id}`)
        }
    }
})

module.exports = router;