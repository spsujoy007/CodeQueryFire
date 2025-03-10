import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      // cb(null, '/tmp')
      cb(null, 'public/temp')
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