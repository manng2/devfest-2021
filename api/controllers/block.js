const uuid = require('uuid');
const Block = require('../db/models/block');

const getBlock = async (req, res) => {
  const { workspaceId } = req.params;
  const { page } = req.query;

  const blocks = await Block.find({ workspaceId, page })

  res.json(blocks);
}

const createBlock = async (req, res) => {
  const { name, type, page } = req.body;
  const { workspaceId } = req.params;
  const roomId = uuid.v1();
  const link = `/room/${roomId}`;

  const block = new Block({
    _id: uuid.v4(),
    name,
    type,
    x: 200,
    y: 200,
    workspaceId,
    link,
    page: +page
  })
  await Block.create(block);

  res.status(200).json(block);
}

const updateBlock = async (req, res) => {
  const { block } = req.body;
  const { blockId } = req.params;

  await Block.findByIdAndUpdate({ _id: blockId }, block);

  res.status(200).json(block);
}

module.exports.createBlock = createBlock;
module.exports.getBlock = getBlock;
module.exports.updateBlock = updateBlock;
