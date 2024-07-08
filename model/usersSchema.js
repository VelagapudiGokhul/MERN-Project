const mongoose=require('mongoose')

const Schema=new mongoose.Schema({
    username:{ type:String, required:true},
    email:{ type:String, required:true, unique: true},
    password:{type:String, required:true},
    courses: { type: [String], default: [] }
},
{ versionKey: false }
)

const User = mongoose.model("User",Schema)

module.exports = User