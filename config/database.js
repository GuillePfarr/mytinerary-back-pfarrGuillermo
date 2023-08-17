import mongoose from "mongoose";

mongoose.connect("mongodb+srv://guillepfarr:<t4oMDpmkNf10L9Qu>@cluster0.unvadoq.mongodb.net/")
.then(()=> {
console.log("Database connected");
})
.catch(()=>{
console.log("Database connection failed");
})
