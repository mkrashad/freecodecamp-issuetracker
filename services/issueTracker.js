const IssueTracker = require('../model/issueTracker');

const addIssue = (
  issueTitle,
  issueText,
  createdBy,
  assigned,
  status,
  project
) => {
  const createdOn = new Date().toISOString();
  const updatedOn = new Date().toISOString();
  const open = true;
  const statusText = status || '';
  const assignedTo = assigned || '';
  const msg = new IssueTracker({
    issue_title: issueTitle,
    issue_text: issueText,
    created_by: createdBy,
    assigned_to: assignedTo,
    status_text: statusText,
    created_on: createdOn,
    updated_on: updatedOn,
    open,
    project,
  });
  msg
    .save()
    .then((_) => {
      console.log('Data successfully added');
    })
    .catch((err) => {
      console.error(err);
    });
  return msg;
};

const getIssues = (project, params) => {
  const issues = IssueTracker.find({ project, ...params });
  return issues;
};

const deleteIssueById = (issueId) => {
  try {
    const issue = IssueTracker.findOneAndDelete({ _id: issueId });
    return issue;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = { addIssue, deleteIssueById, getIssues };
