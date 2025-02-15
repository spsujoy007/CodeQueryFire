import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// upload photo method 
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // upload photo 
        const response = await cloudinary.uploader.upload(localFilePath, {
            folder: 'CodeQueryFire',
            resource_type: "auto"
        })
        
        console.log(`Image uploaded, Data: ${response}`);
        fs.unlinkSync(localFilePath)

        return response
    }
    catch(err) {
        console.log("Error when upload on cloudinary: ", err)
        fs.unlinkSync(localFilePath)
        return `${null}`
    }
}

export {
    uploadOnCloudinary
}