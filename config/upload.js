const multer = require('multer')

const imageStorage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'public/img')
    },
    filename : (req, file, cb) => {
        cb(null, new Date().getTime() +  '-' + file.originalname)
    }
})

const imageFilter = (req, file, cb) => {
    // console.log(file.mimetype)
    const allowedType = ['image/jpeg', 'image/png']
    if (allowedType.includes(file.mimetype)) cb(null, true)
    else cb(null, false)
}

const upload = multer({
    storage : imageStorage,
    fileFilter : imageFilter
}).single('thumbnail')

module.exports = upload