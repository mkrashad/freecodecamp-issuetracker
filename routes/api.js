'use strict';
const issueTracker = require('../services/issueTracker');

module.exports = function (app) {
  app
    .route('/api/issues/:project')

    .get(function (req, res) {
      let project = req.params.project;
    })

    .post(function (req, res) {
      let project = req.params.project;
      issueTracker.addIssue(
        req.body.issue_title,
        req.body.issue_text,
        req.body.created_by,
        req.body.assigned_to,
        req.body.status_text
      );
    })

    .put(function (req, res) {
      let project = req.params.project;
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
