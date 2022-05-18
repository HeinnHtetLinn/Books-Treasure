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
    const author = new Author({
        name : req.body.name
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
    try{
        author = await Author.findById(req.params.id)
        console.log(author)
        author.name = req.body.name
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