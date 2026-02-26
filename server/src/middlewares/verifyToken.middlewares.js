import jwt from "jsonwebtoken"

const verifyToken = (req,res,next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message : "Unauthorized, token missing"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded;
        next();
    }catch(err){
        console.log(`verifyToken middleware error`)
        return res.status(500).json({message : err.message})
    }
}

export default verifyToken