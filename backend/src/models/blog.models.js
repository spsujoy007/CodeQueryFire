import mongoose, {Schema} from "mongoose";

const BlogsSchema = new Schema({
    author_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    details: {
        type: String,
        rerqured: false
    },
    image: {
        url: String,
        public_id: String
    }
}, {timestamps: true})

export const Blog = mongoose.model("Blog", BlogsSchema)