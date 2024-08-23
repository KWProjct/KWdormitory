const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const {
  writeBoard, renderBoardwrite, renderPost, uploadBoard, changePost, 
} = require('../controllers/board');


const router = express.Router();

router.post('/write', writeBoard);


try{
  fs.readdirSync('uploads');
}catch(err){
  console.error('uploads 폴더가 없습니다. 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
/////
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

router.post('/img', uploads.single('img'), uploadBoard);

const upload2 = multer();

router.post('/write', upload2.none(), writeBoard);


router.get('/write', renderBoardwrite);

router.get('/:id', renderPost);

router.post('/:type/:id', changePost);

module.exports = router;