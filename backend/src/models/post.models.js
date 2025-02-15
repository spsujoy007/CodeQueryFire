import mongoose, {Schema} from "mongoose";

const topicSchema = new mongoose.Schema({
    _id: false,
    name: {
        type: String,
        required: true,
        maxlength: [25, "Topic name cannot exceed 25 characters."]
    }
});


const PostsSchema = new Schema({
    author_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        require: true,
        maxlength: [220, "Title cannot be longer than 213 characters."] 
    },
    details:{
        type: String,
        required: false
    },
    images: [
        {
            _id: false,
            url: String,
            public_id: String
        }
    ],
    code: {
        type: String,
        required: false,
    },
    programming_language: {
        type: String,
        required: false
    },
    topics: [topicSchema],
    source: {
        type: String,
        required: false,
    }

}, {timestamps: true})

PostsSchema.path('topics').validate( function (value) {
    return value.length <= 5
}, "you can add only 5 topics")

PostsSchema.path('code').validate({
    validator: function(){
        if(this.code.length <= 0) return true
        else return this.code.length > 0 && this.programming_language.length > 0
    },
    message: "Both code and programming language must be specified."
} )

export const Post = mongoose.model("Post", PostsSchema)