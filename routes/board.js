const express = require('express');
const {
  writeBoard, renderBoard, renderBoardwrite
} = require('../controllers/board');

const router = express.Router();

router.post('/write', writeBoard);

router.get('/write', renderBoardwrite);

router.get('/board', renderBoard);

module.exports = router;