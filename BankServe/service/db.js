// import mongoose
const mongoose =require("mongoose")
mongoose.connect('mongodb://127.0.0.1/bankServe')
const User = mongoose.model('User',
{
 acno:Number,
uname:String,
psw:String,
balance:Number,
transactions:[]
}
)
// export 
module.exports={
    User
}