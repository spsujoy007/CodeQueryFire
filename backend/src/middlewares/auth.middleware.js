import { User } from "../models/users.models";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from 'jsonwebtoken'

export const verifyJWT = asyncHandler ( async ( req, res, next ) => {
    try {
        const token = req.cookies?.access_token || req.headers("Authorization")?.replace("Bearer", "")
    
        if(!token) throw new ApiError(401, "unauthorized request");
    
        const decodedInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedInfo?._id).select("-password -refresh_token")
        if( !user ) throw new ApiError( 401, "Invalid access token" )
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError( 401, error?.message || "Invalid access token")
    }
})