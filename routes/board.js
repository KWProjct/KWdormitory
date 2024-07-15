const express = require('express');
const {
  writeBoard, renderBoardwrite
} = require('../controllers/board');


const router = express.Router();

router.post('/write', writeBoard);

router.get('/write', renderBoardwrite);

module.exports = router;