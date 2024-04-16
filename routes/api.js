'use strict';
const issueTracker = require('../services/issueTracker');

module.exports = function (app) {
  app
    .route('/api/issues/:project')

    .get(async function (req, res) {
      let project = req.params.project;
      const issues = await issueTracker.getIssues(project, req.query);
      if (issues) {
        const result = issues.map((issue) => {
          return {
            _id: issue._id,
            issue_title: issue.issue_title,
            issue_text: issue.issue_text,
            created_on: issue.created_on,
            updated_on: issue.updated_on,
            created_by: issue.created_by,
            assigned_to: issue.assigned_to,
            open: issue.open,
            status_text: issue.status_text,
          };
        });
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: 'Project not found' });
      }
    })

    .post(function (req, res) {
      const project = req.params.project;
      const issueTitle = req.body.issue_title;
      const issueText = req.body.issue_text;
      const createdBy = req.body.created_by;
      const assignedTo = req.body.assigned_to;
      const statusText = req.body.status_text;
      if (project && issueTitle && issueText && createdBy) {
        const result = issueTracker.addIssue(
          issueTitle,
          issueText,
          createdBy,
          assignedTo,
          statusText,
          project
        );
        res.json({
          _id: result._id.toString(),
          issue_title: result.issue_title,
          issue_text: result.issue_text,
          created_on: result.created_on,
          updated_on: result.updated_on,
          created_by: result.created_by,
          assigned_to: result.assigned_to,
          open: result.open,
          status_text: result.status_text,
        });
      } else {
        res.json({ error: 'required field(s) missing' });
      }
    })

    .put(function (req, res) {
      let project = req.params.project;
    })

    .delete(async function (req, res) {
      const issueId = req.body._id;
      if (issueId) {
        const result = await issueTracker.deleteIssueById(issueId);
        if (result) {
          res.json({
            result: 'successfully deleted',
            _id: issueId,
          });
        } else {
          res.json({
            error: 'could not delete',
            _id: issueId,
          });
        }
      } else {
        res.json({ error: 'missing _id' });
      }
    });
};
