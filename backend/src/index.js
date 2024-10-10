import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config({
    path: "../.env"
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5000, () => {
        console.log(`The server is listening port at: ${process.env.PORT || 5000}`)
    })
})
.catch((err) => {
    console.log("MongoDB connection ERROR !!!");
})