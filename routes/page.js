const express = require('express');
const {
  renderJoin, renderMain, login, renderBoard
} = require('../controllers/page');
const {
  isLoggedIn, isNotLoggedIn
} = require('../middleware/middleware');

const router = express.Router();


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


module.exports = router;