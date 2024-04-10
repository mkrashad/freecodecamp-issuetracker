'use strict';
const issueTracker = require('../services/issueTracker');

module.exports = function (app) {
  app
    .route('/api/issues/:project')

    .get(function (req, res) {
      let project = req.params.project;
    })

    .post(async function (req, res) {
      let project = req.params.project;
      const issueTitle = req.body.issue_title;
      const issueText = req.body.issue_text;
      const createdBy = req.body.created_by;
      const assignedTo = req.body.assigned_to;
      const statusText = req.body.status_text;
      if (project && issueTitle && issueText && createdBy) {
        const result = await issueTracker.addIssue(
          issueTitle,
          issueText,
          createdBy,
          assignedTo,
          statusText
        );
        res.json({
          _id: result._id.toString(),
          issue_title: issueTitle,
          issue_text: issueText,
          created_on: result.createdOn,
          updated_on: result.updatedOn,
          created_by: createdBy,
          assigned_to: assignedTo,
          open: result.open,
          status_text: statusText,
        });
      } else {
        res.json({ error: 'required field(s) missing' });
      }
    })

    .put(function (req, res) {
      let project = req.params.project;
    })

    .delete(async function (req, res) {
      const issueId = req.query._id;
      if (issueId) {
        const result = await issueTracker.deleteIssueById(issueId);
        if (result) {
          res.json({ result: 'successfully deleted', _id: issueId });
        } else {
          res.json({ error: 'could not delete', _id: issueId });
        }
      } else {
        res.json({ error: 'missing _id' });
      }
    });
};
