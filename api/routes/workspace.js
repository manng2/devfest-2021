const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspace');
const multer = require('multer');

router.get('/', (req, res, next) => {
  res.send('hello');
});

const upload = multer();

router.post('/create', workspaceController.createWorkSpaceWithoutUserId);
router.get('/:id', workspaceController.getWorkspaceInfo);
router.get('/:id/space', workspaceController.getSpaceInfo);
router.post('/:id/create', upload.single('img'), workspaceController.createWorkspace);

module.exports = router;
