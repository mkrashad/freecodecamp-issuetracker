const IssueTracker = require('../model/issueTracker');
const { Types } = require('mongoose').ObjectId;

const addIssue = (issueTitle, issueText, createdBy, assignedTo, statusText) => {
  const createdOn = new Date().toISOString();
  const updatedOn = new Date().toISOString();
  const open = true;
  const msg = new IssueTracker({
    issueTitle,
    issueText,
    createdBy,
    assignedTo,
    statusText,
    createdOn,
    updatedOn,
    open,
  });
  return msg
    .save()
    .then((_) => {
      console.log('Data successfully added');
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const deleteIssueById = async (issueId) => {
  try {
    const issue = await IssueTracker.findOneAndDelete({ _id: issueId })
    return issue;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = { addIssue, deleteIssueById };
