import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, '/tmp')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}-${Math.random(100, 9999)}`)
    }
  })
  
export const upload = multer({ 
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB লিমিট
    }
})

// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "/tmp"); // Use Vercel's temporary storage
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = ${Date.now()}-${Math.round(Math.random() * 1e9)};
//     cb(null, ${file.originalname}-${uniqueSuffix}${path.extname(file.originalname)});
//   }
// });

// export const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB limit
//   }
// });