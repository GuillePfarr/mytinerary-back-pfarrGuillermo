import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
name:  {type:String, required: true},
last_name: {type:String, required: true},
password:  {type:String, required: true},
email: {type:String, required: true, unique: true},
image:  {type:String, required: true},
country: {type:String},
})
const User = mongoose.model('user', userSchema)

export default User

