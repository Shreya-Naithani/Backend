import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const connectToMongo = async()=>{
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Database is connected successfully");
    }).catch((err)=>{
        console.log(err);
        console.log("Database is disconnected");
    })
}

export default connectToMongo;