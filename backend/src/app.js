import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express()
const allowedOrigins = ["http://localhost:3000", "https://codequeryfire.vercel.app"];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"],
    allowedHeaders: ['Content-Type', 'Authorization']

}));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// for production big level
app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

// routes import 
import userRouter from "./routes/users.routes.js";
import postRouter from './routes/posts.routes.js'

app.use("/api/v1/users", userRouter)
app.use("/api/v1/post", postRouter)
app.use("/", (req, res) => {
    res.send("Server is running")
})

export {app}