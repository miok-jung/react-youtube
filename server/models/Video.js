const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoShema = mongoose.Schema({
    
    writer: {
        type: Schema.Types.ObjectId, // 쓰는 사람의 아이디를 넣는 이유는 유저 모델의 정보를 가져올 수 있다.
        ref: 'User' // 유저 모델에서 불러온다.
    },
    title : {
        type: String,
        maxlength: 50
    },
    description : {
        type: String
    },
    privacy: {
        type: Number // 0 -> privacy, 1 -> public
    },
    filePath: {
        type: String
    },
    category: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String
    }
}, { timestamps: true }) // 만든날짜와 업데이트 날짜가 표시된다.



const Video = mongoose.model('Video', videoShema);

module.exports = { Video }