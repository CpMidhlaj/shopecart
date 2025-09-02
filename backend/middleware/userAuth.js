const jwt = require("jsonwebtoken");
exports.userAuth = (req,res,next)=>{

    try {
        
        const{token} = req.cookies;
        if(!token){
             return res.status(404).json({
                success:false,
                message:"token not found!",
            });
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        // console.log("decode--->",decode);
        req.userId = decode.userId;
        req.userRole = decode.userRole;

        next();
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};
exports.userAuthorization = (requiredRoles)=>{

    return(req,res,next)=>{

         if(!requiredRoles.includes(req.userRole)){
         return res.status(403).json({
                success:false,
                message:"Forbidden!",
            });
           
        };
         next();
    };
};