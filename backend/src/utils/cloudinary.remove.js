import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config({
    path: '../.env'
})


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const removeImageById = async ( public_id ) => {
    console.log(public_id)
    if ( !public_id ) return;

    cloudinary.uploader.destroy(public_id, ( error, result ) => {
        if ( error ) {
            console.log("problem when deleting image.")
            return null
        }
        else{
            console.log('photo deleted successfully.')
            return result
        }
    })
}

export default removeImageById