import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
// `https://codequeryfire.vercel.app`
const app = express()
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(cookieParser())

// for production big level
app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

// routes import 
import userRouter from "./routes/users.routes.js";

app.use("/api/v1/users", userRouter)
app.use("/", (req, res) => {
    res.send("Server is running")
})

export {app}