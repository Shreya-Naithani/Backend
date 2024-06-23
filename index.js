import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
import router from './Routes/allRoute.js';
import connectToMongo from './config/db.js';
const app = express();


const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use('/api',router);

connectToMongo();
app.get('/',(req,res)=>{
    res.send("API is running")
 })

 app.listen(port,()=>{
    console.log(`Server is running on PORT ${port}`);
})
