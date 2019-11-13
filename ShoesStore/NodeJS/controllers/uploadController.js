const express = require('express');
const multer = require('multer');
var router = express.Router();

const storage = multer.diskStorage({
    destination: './public/images/shoes/',
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },

    fileFilter: function (req, file, cb) {
        sanitizeFile(file, cb);
    }

}).single('files');

function sanitizeFile(file, cb) {
    let fileExts = ['png', 'jpg', 'jpeg', 'gif']

    let isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase());
    let isAllowedMimeType = file.mimetype.startsWith("image/")

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true)
    }
    else {
        cb('Error: File type not allowed!')
    }
}

router.get('/image', (req, res) => {
    res.send("Upload");
});

router.post('/image', upload, (req, res) => {
    upload(req, res, (err) => {
        if (!err) {
            res.end("Success");
        }
        else {
            res.end(err);
        }
    });
});

module.exports = router;