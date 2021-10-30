const express = require('express');
const router = express.Router();
const nftController = require('../controllers/nft');

router.post('/', (req, res) => {
  const { imageData, name, description } = req.body;

  // console.log(imageData);
  nftController.createNFT({ imageData, name, description }, {}).then(result => {
    console.log(result);

  })

  res.status(200).json(true);

})

// router.post('/workspace/:workspaceId/create', blockController.createBlock);
// router.get('/workspace/:workspaceId', blockController.getBlock);
// router.post('/:blockId/update', blockController.updateBlock);

module.exports = router;
