const express = require('express');
const router = express.Router();
const nftController = require('../controllers/nft');

router.post('/', (req, res) => {
  const { imageData } = req.body;

  // console.log(imageData);
  nftController.createNFT(imageData, {}).then(res => {
    console.log(res);
  })
})

// router.post('/workspace/:workspaceId/create', blockController.createBlock);
// router.get('/workspace/:workspaceId', blockController.getBlock);
// router.post('/:blockId/update', blockController.updateBlock);

module.exports = router;
