import User from "../Models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


//signin 
export const SignIn  = async(req,res)=>{
    try {
        const {username ,email ,password} =req.body;
       if(!username || !email || !password){
        return res.status(400).json({message:"All fields are required"});
       }
       else{
         const existingEmail = await User.findOne({email:email});
         if(existingEmail){
            return res.status(400).json({message:"User is already registered with this email"});
         }
         const existingUsername = await User.findOne({username:username});
         if(existingUsername){
            return res.status(400).json({message:"User  is already registered with this username"});
         }
         else if(username.length < 3){
            return res.status(400).json({message:"Username should have atleast 3 characters"});
         }
         else{
            const hashedPass = await bcrypt.hash(password,10);
           const newUser = await User.create({
                username:username,
                email:email,
                password:hashedPass
            })
            return res.status(200).json({message:"User created Successfully",data:newUser});
         }
       }
       
    } catch (error) {
       return res.status(500).json({message:error.message});
    }
}


//Login
export const Login  = async(req,res)=>{

    try {
      const {username ,password} = req.body;
      if(!username || !password){
        return res.status(400).json({message:"All fields are required"});
       }
       else{
            const existingUser = await User.findOne({username:username})
                 if(!existingUser){
                    return res.status(400).json({message:"Invalid Credentials"});
                 }
                 else{
                bcrypt.compare(password,existingUser.password,(err,data)=>{
                    if(data){
                        const auth =[
                            {
                                name:"username",  
                            },
                            {
                                jti : jwt.sign({},"shreya")
                            }
                        ]
                        const token = jwt.sign({auth},"shreya",{expiresIn:"2d"});
                        return res.status(200).json({id: existingUser._id , token: token , message:"login successfully"});
                    }
                    else{
                        return res.status(400).json({message:"Invalid Credentials"});
                    }
                })
                  

                 }
       }
    } catch (error) {
       return res.status(500).json({message:error.message});
    }
}