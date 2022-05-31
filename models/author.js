const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profileImage:{
        type:Buffer,
        required:true
    },
    profileImageType:{
        type:String,
        required:true
    }
})
authorSchema.virtual("profileImagePath").get(function(){
    if(this.profileImage != null && this.profileImageType != null){
        return `data:${this.profileImageType};charset=utf8;base64,${this.profileImage.toString("base64")}`;
    }
})

module.exports = mongoose.model("Authors", authorSchema)