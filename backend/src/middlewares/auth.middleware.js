import { User } from "../models/users.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

export const verifyJWT = asyncHandler ( async ( req, res, next ) => {
    try {
        const token = req.cookies?.access_token || (req.headers['authorization'] ? req.headers['authorization'].replace('Bearer ', '') : '');
        // refresh token
        if ( !token ) {
            //when access_token expired then request through the refresh token.
            const refresh_token = req.cookies?.refresh_token || (req.headers['authorization'] ? req.headers['authorization'].replace('Bearer ', '') : '')
            
            if(!refresh_token){
                res.status(401).json("unauthorized request or token was expired")
                throw new ApiError(401, "unauthorized request or token was expired")
            }
            
            console.log('first')
            const decodedInfo = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
            
            if(!decodedInfo) {
                console.log(decodedInfo, "Hited")
                return res.status(401).json("unauthorized request or token was expired") 
            }
            
            const new_access_token = await user.generateAccessToken()
            
            const options = {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 24 * 60 * 60 * 1000 // for 1 day browser accept
                // maxAge: 2 * 60 * 1000 // for 2 minute browser accept
            }
            
            res
            .status(201)
            .cookie('access_token', new_access_token, options)
            return next()
        }
        if(!token) {
            res.status(401).json("unauthorized request or token was expired")
            throw new ApiError(401, "unauthorized request or token was expired")
        };
        
        const decodedInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        const user = await User.findById(decodedInfo?._id).select("-password -refresh_token")
        
        if( !user )  new ApiResponse( 401, "Invalid access token" )
    
        req.user = user;
        next()
    } catch (error) {
        new ApiResponse( 401, error?.message, "Invalid access token")
    }
})