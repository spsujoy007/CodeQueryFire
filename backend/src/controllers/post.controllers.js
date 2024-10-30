import { User } from "../models/users.models.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.js";


const post_Question = asyncHandler ( async (req, res) => {
    console.log(req.files)
    // const post_data = req.body
    // const {
    //     title,
    //     details,   
    //     images,
    //     code,  
    //     topics,
    //     programming_language,  
    //     source
    // } = post_data
    console.log(req.body)
    res.send(req.body)
} )

export {
    post_Question
}