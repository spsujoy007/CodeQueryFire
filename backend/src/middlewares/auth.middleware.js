import { User } from "../models/users.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from 'jsonwebtoken'

export const verifyJWT = asyncHandler ( async ( req, res, next ) => {
    try {
        
        const token = req.cookies?.access_token || (req.headers['authorization'] ? req.headers['authorization'].replace('Bearer ', '') : '');
        
        if(!token) throw new ApiError(401, "unauthorized request or token was expired");
        
        const decodedInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        const user = await User.findById(decodedInfo?._id).select("-password -refresh_token")
        // console.log("USER::::: ", user)
        if( !user ) throw new ApiError( 401, "Invalid access token" )
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError( 401, error?.message || "Invalid access token")
    }
})