import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("multer: ", file)
      cb(null, '../public/temp')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
export const upload = multer({ 
    storage: storage
})

// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.resolve(__dirname, "../public/temp")); // Ensures absolute path
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`); // Adds timestamp to filename
//   },
// });

// export const upload = multer({
//   storage: storage,
// });
