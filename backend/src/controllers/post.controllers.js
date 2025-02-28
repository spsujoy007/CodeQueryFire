import { User } from "../models/users.models.js";
import mongoose, { Mongoose } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
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
    
    try{
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
        
        if(!newPost) {
            return res.send("ERRR")
        }
    
        return res
        .status(201)
        .json(
            new ApiResponse(201, newPost, "Post uploaded successfully")
        )
    }
    catch(err) {
        return res
        .status(502)
        .json(
            new ApiResponse(502, {error: err.message}, err.message)
        )
    }

} )


const ViewHomePosts = asyncHandler ( async (req, res) => {
    const getCategory = req.query.category;
    const categories =  [
      {name: 'todays', sort_date: 1},
      {name: 'week', sort_date: 7},
      {name: 'month', sort_date: 30},
    ]

    const query = categories.find(cat => cat.name === getCategory)
    const matchCondition = query && getCategory !== undefined ? { createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - query.sort_date)) } }
    : {}; 
    
    const posts = await Post.aggregate(
        [
            {
              $match: matchCondition
            },
            {
              $lookup: {
                from: 'users',
                localField: 'author_id',
                foreignField: '_id',
                as: 'author'
              }
            },
            {
              $addFields: {
                author: {$first: "$author"}
              }
            },
            {
              $set: {
                "author.full_name": {
                  $concat: ["$author.first_name", " ",  "$author.last_name"]
                }
              }
            },
            {
              $project: {
                author_id: 0,
                author: {
                  password: 0,
                  refresh_token: 0,
                  __v: 0,
                  posts: 0,
                  blogs: 0
                }
              }
            },
            {
                $sort: {
                  createdAt: -1
                }
            }
    ])

    if(posts.length == 0){
      console.log('no posts')
        return res 
        .status(200)
        .json(new ApiResponse(200, {}, "No data founded"))
    }

    res
    .status(200)
    .json(
        new ApiResponse(200, {posts: posts}, "All posts fetched successfully")
    )
})

const SinglePostDetails = asyncHandler ( async (req, res) => {
    const {id} = req.query
    const post = await Post.aggregate(
        [
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
              $lookup: {
                from: 'users',
                localField: 'author_id',
                foreignField: '_id',
                as: 'author'
              }
            },
            {
              $addFields: {
                author: {$first: "$author"}
              }
            },
            {
              $set: {
                "author.full_name": {
                  $concat: ["$author.first_name", " ",  "$author.last_name"]
                }
              }
            },
            {
              $project: {
                author_id: 0,
                author: {
                  password: 0,
                  refresh_token: 0,
                  __v: 0,
                  posts: 0,
                  blogs: 0
                }
              }
            },
            {
                $sort: {
                  createdAt: -1
                }
            }
    ])


    if(!post){
        return res 
        .status(500)
        .json(new ApiResponse(500, {}, "No data founded"))
    }

    res
    .status(200)
    .json(
        new ApiResponse(200, {post: post[0]}, "All posts fetched successfully")
    )
})

const MyPostsController = asyncHandler ( async (req, res) => {
    // console.log(req.user?._id)
  const posts = await Post.aggregate(
      [
          {
            $match: {
              author_id: new mongoose.Types.ObjectId(req.user?._id)
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'author_id',
              foreignField: '_id',
              as: 'author'
            }
          },
          {
            $addFields: {
              author: {$first: "$author"}
            }
          },
          {
            $set: {
              "author.full_name": {
                $concat: ["$author.first_name", " ",  "$author.last_name"]
              }
            }
          },
          {
            $project: {
              author_id: 0,
              author: {
                password: 0,
                refresh_token: 0,
                __v: 0,
                posts: 0,
                blogs: 0
              }
            }
          },
          {
              $sort: {
                createdAt: -1
              }
          }
  ])

  if(posts.length == 0){
    console.log('no posts')
      return res 
      .status(200)
      .json(new ApiResponse(200, {}, "No data founded"))
  }

  res
  .status(200)
  .json(
      new ApiResponse(200, {posts: posts}, "All posts fetched successfully")
  )
})


const EditPostController = asyncHandler ( async ( req, res ) => {
  // get the edited data
  let editedData = req.body; 
  console.log(editedData)
  
  // check if the user is the author of the post
  if(req.user?._id !== await Post.findById({_id: new mongoose.Types.ObjectId(editedData._id)}).select('author_id').author_id){
    return res
    .status(400)
    .json(new ApiResponse(400, {}, "You are not allowed to edit this post"))
  }
  
  // check if the author_id is not changed
  if(editedData?.author_id){
    return res
    .status(400)
    .json(new ApiResponse(400, {}, "You are not allowed to edit author_id"))
  }
  
  try{
    const updatedPost = await Post.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(editedData._id)}, editedData, {new: true});
    
    if(!updatedPost){
      return res
      .status(404)
      .json(new ApiResponse(404, {},"No post founded"))
    } // check if the post is founded
    
    return res
    .status(200)
    .json(new ApiResponse(200, {
      post: updatedPost
    }, 'Post upated successfully'))
  }
  catch(err){
    return res
    .status(500)
    .json(new ApiResponse(500, {}, "Error when updating post"))
  }
})


export {
    post_Question,
    ViewHomePosts,
    SinglePostDetails,
    MyPostsController,
    EditPostController
}