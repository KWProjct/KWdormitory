const express = require('express');
const {
  writeBoard, renderBoardwrite, renderPost, 
} = require('../controllers/board');


const router = express.Router();

router.post('/write', writeBoard);

router.get('/write', renderBoardwrite);

router.get('/:id', renderPost);

module.exports = router;