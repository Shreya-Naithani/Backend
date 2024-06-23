import jwt from 'jsonwebtoken';

export const authentication  = async(req,res,next)=>{

    const token = req.body.token || req.header("Authorization").replace("Bearer " ,"");

if(token === null){
    return res.status(400).json({message:"Invalid token"});
}
jwt.verify(token,"shreya",(err,user)=>{
    if(err){
        return res.status(403).json({message:err.message});
    }
    req.user = user;
    next();
})
}