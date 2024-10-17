import { User } from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/AsyncHandler";

const registerUser = asyncHandler( async (req, res) => {
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

export {registerUser}