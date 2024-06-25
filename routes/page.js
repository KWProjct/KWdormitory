const express = require('express');
const {
  renderJoin, renderMain, jusoPop, jusoSave,
} = require('../controllers/page');

const router = express.Router();


router.get('/join', renderJoin);

router.get('/', renderMain);

router.get('/jusopop', jusoPop);

router.post('/jusopop', jusoSave);

module.exports = router;