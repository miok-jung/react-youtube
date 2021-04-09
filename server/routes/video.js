const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const path = require('path');
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        if (ext !== '.mp4') { // 비디오만 업로드가 가능하다. 추가적으로 하고 싶다면 || 후 추가한다.
            return cb(new Error('only mp4 is allowed'), false);
        }
        cb(null, true);
    },
}).single('file');
//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
    // 비디오를 서버에 저장한다.
    upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
    })
})

router.post('/thumbnail', (req, res) => {
    // 썸네일 생성 + 비디오 러닝타임 가져오기

    // 정의
    let filePath = "";
    let fileDuration = "";

    // 비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        console.dir(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata. format.duration;
    });

    // 썸네일 생성
    ffmpeg(req.body.url) // uploads 저장경로를 가져온다.
    .on('filenames', function (filenames) { // filenames 생성
        console.log('Will generate ' + filenames.join(', '));
        console.log(filenames);

        filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on('end', function () { // 썸네일 생성 후 해야할 일
        console.log('Screenshots taken');
        return res.json({ success: true, url: filePath, fileDuration: fileDuration }); // 썸네일 생성 성공시 클라이언트로 넘어가는 데이터
    })
    .on('error', function (err) { // 에러가 발생할 때 해야할 일
        console.error(err);
        return res.json({ success: false, err });
    })
    .screenshots({ // 옵션
        count: 1, // 3개의 썸네일을 찍을 수 있다.
        folder: 'uploads/thumbnails', // 썸네일 저장 경로로 폴더를 경로에 맞게 생성해준다.
        size: '320x240', // 썸네일 사이즈
        filename: 'thumbnail-%b.png' // thumbnail-파일원래이름(확장자를 제거한)상태로 저장이 된다.
    })
})

router.post('/uploadVideo', (req, res) => {
    // 비디오 정보들을 저장한다.
    const video = new Video(req.body) // 클라이언트에 보낸 모든 정보가 저장된다. 즉, VideoUploadPage.js에 있는 variables값이 여기에 다 저장이 된다.
    video.save((err, doc) => { // MongoDB method로 저장을 시켜준다.
        if(err) return res.json({ success: false, err })
        res.status(200).json({ success: true })
    }) 
})

module.exports = router;
