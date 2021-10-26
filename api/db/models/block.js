const mongoose = require('mongoose');

const BlockSchema = new mongoose.Schema({
  _id: String,
  type: String,
  name: String,
  x: Number,
  y: Number,
  userId: String,
  workspaceId: String,
  link: String,
  page: Number,
  text: String
})

module.exports = mongoose.model('Block', BlockSchema);
