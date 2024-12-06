import mongoose from "mongoose";
import { User } from "../models/users.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000 // for 1 day browser accept
    // maxAge: 2 * 60 * 1000 // for 2 minute browser accept
}

const refreshtokenOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 30 * 24 * 60 * 60 * 1000
}

const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        
        // generate tokens
        const access_token = user.generateAccessToken()
        const refresh_token = user.generateRefreshToken()

        // save the refresh token to the database
        user.refresh_token = refresh_token

        // close all validations before save
        await user.save({ validationBeforeSave: false })

        return { access_token, refresh_token }

    } catch (error) {
        throw new ApiError(505, "Something went wrong when generate access and refresh token")
    }
}

const registerUser = asyncHandler ( async (req, res) => {
    // 1. get user details from frontend
    // 2. validation - not empty
    // 3. check if user already exists: username, email
    // 4. create a user object - create entry in db
    // 5. remove password and refresh token field from response
    // 6. check for user creation
    // 7. return res

    // STEP 1 _______________________________________________________________
    const {first_name, last_name, email, password} = req.body;
    
    // STEP 2 _______________________________________________________________
    if ( [first_name, last_name, email, password].some(field => field?.trim() === "") ) throw new ApiError(400, "All fields is required")

    // STEP 3 _______________________________________________________________
    const existUser = await User.findOne({email})
    if( existUser ) { 
        throw new ApiError(404, "user with this email already exists")
    }
    
    // STEP 4 _______________________________________________________________
    const user = await User.create({
        first_name,
        last_name,
        email,
        password,
    })

    // STEP 5 _______________________________________________________________
    const created_userdata = await User.findById(user._id).select('-password -refreshToken')

    // STEP 6 _______________________________________________________________
    if ( !created_userdata ) throw new ApiError(500, "something went wrong when registering the user")
    
    // STEP 7 _______________________________________________________________
    return res
    .status(201)
    .json(new ApiResponse(200, created_userdata, "account created successfully"))
})

const loginUser = asyncHandler ( async (req, res) => {
    // 1. get email and password from body
    // 2. validation: find user
    // 3. validation: check password
    // 4. set access and refresh token by cockies
    // 5. remove password and refreshToken from response
    // 6. response

    // get user data
    const { email, password } = req.body;
    const existUser = await User.findOne({email})
    console.log("EXISTED USER-------------------", existUser)

    // validation of existed user
    if(!existUser) throw new ApiError(404, "user with this email does not exist")
    
    // validation check password
    const isPasswordCorrect = await existUser.isPasswordCorrect(password)
    if(!isPasswordCorrect) throw new ApiError(401, "invalid user credential")

    // generate access token
    const { access_token, refresh_token } = await generateAccessAndRefreshToken(existUser._id)

    const loggedInUser = await User.findById(existUser._id).select("-password -refreshToken")

    // response with set access and refresh token in cookies
    return res
    .status(200)
    .cookie("access_token", access_token, options)
    .cookie("refresh_token", refresh_token, refreshtokenOptions)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                access_token,
                refresh_token
            },
            "user successfuly logged in"
        )
    )
})

const changePassword = asyncHandler ( async (req, res) => {
    // get old and new password
    // find existed user by token
    // validate user
    // change password by method
    // save user and return
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if( !isPasswordCorrect ) throw new ApiError(400, "invalid old password")

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res 
    .status(200)
    .json( new ApiResponse( 200, {}, "password successfuly changed" ))
})

const loggedInProfile = asyncHandler ( async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user?._id)
            }
        },
        {
            $project: {
                _id: 0,
                password: 0,
                refresh_token: 0
            }
        }
    ])

    if ( !user ) throw new ApiError(401, "not a valid user");

    res 
    .status(200)
    .json( new ApiResponse(200, user[0], "user profile successfully fetched") )
})

const editUserProfile = asyncHandler ( async ( req, res ) => {
    const {
        first_name,
        last_name,
        bio
    } = req.body;

    const updateUserData = await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            first_name,
            last_name,
            bio
        }
    })
    updateUserData.save()

    const updatedData = await User.findById(req.user?._id)

    res.send(updatedData)
})

const updateUserAvatar = asyncHandler ( async ( req, res ) => {
    const avatarLocalPath = req.files?.avatar[0]?.path;

    if( !avatarLocalPath ) {
        return res
        .status(404)
        .json(new ApiResponse(404, {}, "Avatar file is requireed!"))
    }

    const uploadImage = await uploadOnCloudinary(avatarLocalPath);
    console.log(uploadImage)
    
    const updateAvatar = await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            "avatar.url": uploadImage.url,
            "avatar.public_id": uploadImage.public_id
        }
    })
    
    updateAvatar.save()
    
    return res
    .status(200)
    .json(new ApiResponse(
        200, 
        {
            image: {
            url: uploadImage.url,
            public_id: uploadImage.public_id
        }}, 
        "Avatar updated successfully."
    ))
})


export { registerUser, loginUser, changePassword, loggedInProfile, editUserProfile, updateUserAvatar }