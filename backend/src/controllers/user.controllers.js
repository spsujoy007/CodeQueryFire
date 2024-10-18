import { User } from "../models/users.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const options = {
    httpOnly: true,
    secure: true
}

const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        
        // generate tokens
        const access_token = user.generateAccessToken()
        const refresh_token = user.generateRefreshToken()

        // save the refresh token to the database
        user.refreshToken = refresh_token

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
    if( existUser ) throw new ApiError(409, "user with this email already exists")
    
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
    .json(new ApiResponse(200, created_userdata, "user created successfully"))
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
    if(!isPasswordCorrect) throw new ApiError(4041, "invalid user credential")

    // generate access token
    const { access_token, refresh_token } = await generateAccessAndRefreshToken(existUser._id)

    const loggedInUser = await User.findById(existUser._id).select("-password -refreshToken")

    // response with set access and refresh token in cookies
    return res
    .status(200)
    .cookie("access_token", access_token, options)
    .cookie("refresh_token", refresh_token, options)
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

export { registerUser, loginUser }