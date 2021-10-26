const mongoose = require('mongoose');

const WorkspaceSchema = new mongoose.Schema({
  _id: String,
  name: String,
  userId: String,
  spaces: Array
})

module.exports = mongoose.model('Workspace', WorkspaceSchema);
