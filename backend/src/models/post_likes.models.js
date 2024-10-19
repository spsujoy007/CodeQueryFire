import mongoose, {Schema} from "mongoose";

const PostLikesSchema = new Schema({
    post_id: {
        type: Schema.Types.ObjectId,
        ref: "Post"
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

export const PostLike = mongoose.model("PostLike", PostLikesSchema)