'use strict';
const Issue = require('../services/issueTracker');

module.exports = function (app) {
  app
    .route('/api/issues/:project')

    .get(async function (req, res) {
      const project = req.params.project;
      const issues = await Issue.getIssues(project, req.query);
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

    .post(async function (req, res) {
      const project = req.params.project;
      const issueTitle = req.body.issue_title;
      const issueText = req.body.issue_text;
      const createdBy = req.body.created_by;
      const assignedTo = req.body.assigned_to;
      const statusText = req.body.status_text;
      if (project && issueTitle && issueText && createdBy) {
        const result = await Issue.addIssue(
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

    .put(async function (req, res) {
      const { _id, ...data } = req.body;

      if (!_id) {
        return res.json({ error: 'missing _id' });
      }

      const filteredData = {};
      for (const key in data) {
        if (data[key] !== '') {
          filteredData[key] = data[key];
        }
      }

      if (Object.keys(filteredData).length === 0) {
        return res.json({ error: 'no update field(s) sent', _id });
      }

      const result = await Issue.updateIssue(_id, filteredData);
      if (result.modifiedCount < 1) {
        return res.json({ error: 'could not update', _id });
      } else {
        return res.json({
          result: 'successfully updated',
          _id,
        });
      }
    })

    .delete(async function (req, res) {
      const issueId = req.body._id;
      if (!issueId) {
        return res.json({ error: 'missing _id' });
      }
      const result = await Issue.deleteIssueById(issueId);
      if (result) {
        return res.json({
          result: 'successfully deleted',
          _id: issueId,
        });
      } else {
        return res.json({
          error: 'could not delete',
          _id: issueId,
        });
      }
    });
};
