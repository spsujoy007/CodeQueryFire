import mongoose, {mongo, Schema} from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        url: {
            type: String,
            required: true
        },
        public_id: String
    },
    bio: {
        type: String,
        maxlength: 150
    },
    phone: String,
    password: {
        type: String,
        requiredPaths: [true, "Password is true"]
    },
    refreshToken: {
        type: String
    }

}, {timestamps: true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password) 
}

export const User = mongoose.model("User", userSchema)