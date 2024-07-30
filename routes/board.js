const express = require('express');
const {
  writeBoard, renderBoardwrite, renderPost, changePost,
} = require('../controllers/board');


const router = express.Router();

router.post('/write', writeBoard);

router.get('/write', renderBoardwrite);

router.get('/:id', renderPost);

router.post('/:type/:id', changePost);

module.exports = router;