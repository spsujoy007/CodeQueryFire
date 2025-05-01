import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config({
    path: "../.env"
})

const port = process.env.PORT || 5000
connectDB()
.then(()=>{
    app.listen(port, () => {
        console.log(`The server is listening at: ${process.env.PORT || 'http://localhost:5000'}`)
    })
})
.catch((err) => {
    console.log("MongoDB connection ERROR !!!");
})