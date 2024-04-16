const mongoose = require('mongoose');

const issueTracker = new mongoose.Schema({
  issue_title: { type: String, require: true },
  issue_text: { type: String, require: true },
  created_by: { type: String, require: true },
  assigned_to: { type: String },
  status_text: { type: String },
  created_on: { type: String },
  updated_on: { type: String },
  open: { type: Boolean },
  project: { type: String, require: true },
});

module.exports = mongoose.model('IssueTracker', issueTracker);
