const express = require('express');
const {
  boardWrite, renderBoard, renderBoardWrite
} = require('../controllers/board');

const router = express.Router();

router.post('/write', boardWrite);

router.get('/write', renderBoardWrite);

router.get('/board', renderBoard);