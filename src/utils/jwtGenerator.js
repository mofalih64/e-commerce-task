const jwt= require("jsonwebtoken")
require("dotenv").config();

function jwtGenerstor(user_id){
    const payload={
        user:user_id
    }
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"10d"})
}

module.exports=jwtGenerstor