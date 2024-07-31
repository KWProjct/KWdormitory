const express = require('express');
const {
  writeBoard, renderBoardwrite, renderPost, uploadBoard,
} = require('../controllers/board');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

try{
  fs.readdirSync('uploads');
}catch(err){
  console.error('uploads 폴더가 없습니다. 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const uploads = multer({
  storage: multer.diskStorage({
    destination(req, file, done){
      done(null, 'uploads/');
    },
    filename(req, file, done){
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
  }),
  limits: {fileSize: 5 * 1024 * 1024}
});

const router = express.Router();

router.post('/img', uploads.single('img'), writeBoard);

const upload2 = multer();

router.post('/write', upload2.none(), uploadBoard);

router.get('/write', renderBoardwrite);

router.get('/:id', renderPost);

module.exports = router;