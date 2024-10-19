import mongoose, {Schema} from "mongoose";

const BlogLikesSchema = new Schema({
    blog_id: {
        type: Schema.Types.ObjectId,
        ref: "Blog"
    },
    liker_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reaction: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const BlogLike = mongoose.model("BlogLike", BlogLikesSchema)