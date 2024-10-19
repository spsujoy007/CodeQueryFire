import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true
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
            type: String
        },
        public_id: String
    },
    bio: {
        type: String,
        maxlength: 150
    },
    phone: {
        type:  String
    },
    password: {
        type: String,
        minlength: 6,
        requiredPaths: [true, "Password must be in 6 charecters of upper"]
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Blog"
        }
    ],
    refreshToken: {
        type: String
    }

}, {timestamps: true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("email")) return next()
    this.username = this.email.split("@")[0]
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)