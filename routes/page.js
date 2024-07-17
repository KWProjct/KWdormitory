const express = require('express');
const {
  renderJoin, renderMain, login, renderBoard, renderMyPage,
} = require('../controllers/page');
const {
  isLoggedIn, isNotLoggedIn
} = require('../middleware/middleware');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/join', renderJoin);

router.get('/', renderMain);

router.get('/jusopop', (req, res) => {
  res.render('jusopop');
});

router.post('/jusopop', (req, res) => {
  res.locals = req.body;
  console.log(res.locals);
  res.render('jusopop');
});

router.get('/login', login);

router.get('/board', renderBoard);

router.get('/mypage', renderMyPage);

module.exports = router;