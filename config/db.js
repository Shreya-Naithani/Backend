import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const connectToMongo = async()=>{
    await mongoose.connect("mongodb+srv://naithanishreya7409:rinisonu@cluster0.vxd6yf9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        console.log("Database is connected successfully");
    }).catch((err)=>{
        console.log(err);
        console.log("Database is disconnected");
    })
}

export default connectToMongo;
