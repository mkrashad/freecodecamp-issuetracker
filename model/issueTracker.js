const mongoose = require('mongoose');

const issueTracker = new mongoose.Schema({
  issueTitle: { type: String, require: true },
  issueText: { type: String, require: true },
  createdBy: { type: String, require: true },
  assignedTo: { type: String },
  statusText: { type: String },
  createdOn: { type: String },
  updatedOn: { type: String },
  open: { type: Boolean },
});

module.exports = mongoose.model('IssueTracker', issueTracker);
