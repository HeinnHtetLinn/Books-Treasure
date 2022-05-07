if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv')
    dotenv.config()
}
const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
// import cors from "cors";
const bodyParser = require('body-parser');
const indexRouter = require("./routes/index")
const authorRouter = require("./routes/authors")
const bookRouter = require("./routes/books")
const upload = require("express-fileUpload")
const app = express();
    app.set('view engine', 'ejs')
    app.set("views", __dirname + "/views")
    app.set('layout', "layouts/layout")
    app.use(expressEjsLayouts);
    app.use(express.static("public"))
    app.use(bodyParser.urlencoded({limit:"10mb", extended:false}))
    app.use(upload())
    mongoose.connect(process.env.DATABASE_URL , {
        useNewUrlParser: true,
    })
    const db = mongoose.connection
    db.on("error", error=>{
        console.error(error)
    })
    db.once('open', ()=>console.log("conected to Mongoose"))


     app.use("/" , indexRouter)
     app.use("/authors", authorRouter)
     app.use("/books", bookRouter)
// // routes
// app.use(cors())

app.listen(process.env.PORT || 3000)