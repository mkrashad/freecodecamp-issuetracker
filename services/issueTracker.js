const IssueTracker = require('../model/issueTracker');

const addIssue = (issueTitle, issueText, createdBy, assignedTo, status) => {
  const createdOn = new Date().toISOString();
  const updatedOn = new Date().toISOString();
  const open = true;
  const statusText = status || ''
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
   msg
    .save()
    .then((_) => {
      console.log('Data successfully added');
    })
    .catch((err) => {
      console.error(err);
    });
    return msg
};

const deleteIssueById = (issueId) => {
  try {
    const issue = IssueTracker.findOneAndDelete({ _id: issueId })
    return issue;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = { addIssue, deleteIssueById };
