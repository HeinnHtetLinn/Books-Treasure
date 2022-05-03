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

const app = express();
    app.set('view engine', 'ejs')
    app.set("views", __dirname + "/views")
    app.set('layout', "layouts/layout")
    app.use(expressEjsLayouts);
    app.use(express.static("public"))
    app.use(bodyParser.urlencoded({limit:"10mb", extended:false}))

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
// // routes
// app.use(cors())

app.listen(process.env.PORT || 3000)