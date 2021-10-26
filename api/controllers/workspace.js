require('dotenv').config();

const uuid = require('uuid');
const Workspace = require('../db/models/workspace');
const cloudinary = require('cloudinary').v2;

const createWorkspace = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { file } = req;

  const base64Img = `data:${file.mimetype};base64,` + Buffer.from(file.buffer).toString('base64');

  cloudinary.config({
    cloud_name: 'kittyholic',
    api_key: '483233327447876',
    api_secret: 'qYPWVErdKqZM3UsiBkc5G_SdNP8',
    secure: true
  });

  cloudinary.uploader.upload(base64Img, async function (error, result) {
    const { url } = result;
    const newspace = {
      name,
      img: url
    }

    await Workspace.updateOne({ _id: id }, { $push: { spaces: newspace } })

    const workspace = await Workspace.findOne({ _id: id });

    res.json(workspace)

  });
}

const getSpaceInfo = async (req, res) => {
  const { id } = req.params;
  const { page } = req.query;

  const workspace = await Workspace.findOne({
    _id: id
  }, {
    spaces: 1,
    _id: 0
  });

  res.json(workspace.spaces[+page - 1]);
}

const getWorkspaceInfo = async(req, res) => {
  const { id } = req.params;

  const workspace = await Workspace.findById(id);

  res.json(workspace);
}

const createWorkSpaceWithoutUserId = async (req, res) => {
  const { name } = req.body;

  const newWorkSpace = {
    _id: uuid.v4(),
    name,
    userId: uuid.v4()
  }

  await Workspace.create(newWorkSpace);

  res.json(newWorkSpace);
}

module.exports.getSpaceInfo = getSpaceInfo;
module.exports.createWorkspace = createWorkspace;
module.exports.getWorkspaceInfo = getWorkspaceInfo;
module.exports.createWorkSpaceWithoutUserId = createWorkSpaceWithoutUserId;


