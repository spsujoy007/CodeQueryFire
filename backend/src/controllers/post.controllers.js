import { User } from "../models/users.models.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Post } from "../models/post.models.js";


const post_Question = asyncHandler ( async (req, res) => {
    // console.log(req.files)
    const {
        title,
        details,
        code,  
        topics,
        programming_language,  
        source
    } = req.body
    
    const newTopics = []
    topics.map(t => newTopics.push({name: t}));
    
    if(
        [title, details].some((field) => field?.trim() === "")
    ){
        return res.status(404).json(new ApiResponse(404, {}, "Title, details and topics are required"))
    }
    // console.log(req.files)
    const imageLinksByCloudinary = []
    if(req.files?.length > 0){
        for(let i = 0; i < req.files.length; i++){
            const file = req.files[i]
    
            if(!file) {
                return res
                .status(404)
                .json(new ApiResponse(404, {}, "Image file is missing"))
            }
    
            try {
                const uploadedImage = await uploadOnCloudinary(file.path)
                imageLinksByCloudinary.push({url: uploadedImage?.url, public_id: uploadedImage?.public_id})
            }
            catch(err) {
                return res
                .status(501)
                .json(new ApiResponse(501, {}, "Error when uploading images."))
            }
        }
    }
    
    const newPost = await Post.create({
        author_id: req.user?._id,
        title,
        details,
        code: code,
        topics: newTopics,
        programming_language: programming_language,
        source: source,
        images: imageLinksByCloudinary
    })
    console.log(newPost)
    
    if(!newPost) {
        return res.send("ERRR")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201, newPost, "Post uploaded successfully")
    )

} )


const ViewHomePosts = asyncHandler ( async (req, res) => {
    const query = req.query
    const posts = await Post.find({
        createdAt
    })
})

export {
    post_Question
}