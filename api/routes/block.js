const express = require('express');
const router = express.Router();
const blockController = require('../controllers/block');

router.get('/', (req, res, next) => {
  res.send('hello');
});

router.post('/workspace/:workspaceId/create', blockController.createBlock);
router.get('/workspace/:workspaceId', blockController.getBlock);
router.post('/:blockId/update', blockController.updateBlock);

module.exports = router;
