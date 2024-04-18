const Issue = require('../model/issueTracker');

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
  const msg = new Issue({
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
  const issues = Issue.find({ project, ...params });
  return issues;
};

const updateIssue = async (issueId, data) => {
  try {
    const issue = await Issue.updateMany(
      { _id: issueId },
      { $set: data, updated_on: new Date().toISOString() }
    );
    return issue;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const deleteIssueById = async (issueId) => {
  try {
    const issue = await Issue.findOneAndDelete({ _id: issueId });
    return issue;
  } catch (err) {
    return null;
  }
};

module.exports = {
  addIssue,
  getIssues,
  updateIssue,
  deleteIssueById,
};
