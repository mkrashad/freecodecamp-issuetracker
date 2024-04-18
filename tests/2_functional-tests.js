const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let _id;

suite('Functional Tests', function () {
  test('Should create an issue with every field: POST request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .post('/api/issues/apitest')
      .send({
        issue_title: 'Fix error in posting data',
        issue_text: 'When we post data it has an error.',
        created_by: 'Joe',
        assigned_to: 'Joe',
        open: true,
        status_text: 'In QA',
      })
      .end(function (err, res) {
        assert.equal(res.body.issue_title, 'Fix error in posting data');
        assert.equal(res.body.issue_text, 'When we post data it has an error.');
        assert.equal(res.body.created_by, 'Joe');
        assert.equal(res.body.assigned_to, 'Joe');
        assert.equal(res.body.open, true);
        assert.equal(res.body.status_text, 'In QA');
        assert.equal(res.status, 200);
        _id = res.body._id;
        done();
      });
  });

  test('Should create an issue with only required fields: POST request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .post('/api/issues/apitest')
      .send({
        issue_title: 'Fix error in posting data',
        issue_text: 'When we post data it has an error.',
        created_by: 'Joe',
      })
      .end(function (err, res) {
        assert.equal(res.body.issue_title, 'Fix error in posting data');
        assert.equal(res.body.issue_text, 'When we post data it has an error.');
        assert.equal(res.body.created_by, 'Joe');
        assert.equal(res.body.assigned_to, '');
        assert.equal(res.body.status_text, '');
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Should create an issue with missing required fields: POST request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .post('/api/issues/apitest')
      .send({
        issue_title: 'Title',
        issue_text: '',
        created_by: '',
      })
      .end(function (err, res) {
        assert.deepEqual(res.body, { error: 'required field(s) missing' });
        done();
      });
  });

  test('Should view issues on a project: GET request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .get('/api/issues/apitest')
      .end(function (err, res) {
        assert.isArray(res.body);
        assert.property(res.body[0], '_id');
        assert.property(res.body[0], 'issue_title');
        assert.property(res.body[0], 'issue_text');
        assert.property(res.body[0], 'created_on');
        assert.property(res.body[0], 'updated_on');
        assert.property(res.body[0], 'created_by');
        assert.property(res.body[0], 'assigned_to');
        assert.property(res.body[0], 'open');
        assert.property(res.body[0], 'status_text');
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Should view issues on a project with one filter: GET request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .get('/api/issues/apitest')
      .query({
        created_by: 'rashad',
      })
      .end(function (err, res) {
        res.body.forEach((issue) => {
          assert.equal(issue.open, 'Rashad');
        });
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Should view issues on a project with multiple filters: GET request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .get('/api/issues/apitest')
      .query({
        created_by: 'rashad',
        open: true,
      })
      .end(function (err, res) {
        res.body.forEach((issue) => {
          assert.equal(issue.created_by, 'Rashad');
          assert.equal(issue.open, true);
        });
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Should update one field on an issue: PUT request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .send({
        _id,
        issue_title: 'Title 2',
      })
      .end(function (err, res) {
        assert.deepEqual(res.body, {
          _id: res.body._id,
          result: 'successfully updated',
        });
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Should update multiple fields on an issue: PUT request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .send({ _id, issue_title: 'Title 2', issue_text: 'test' })
      .end(function (err, res) {
        assert.deepEqual(res.body, {
          _id: res.body._id,
          result: 'successfully updated',
        });
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Should update an issue with missing _id: PUT request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .send({})
      .end(function (err, res) {
        assert.deepEqual(res.body, {
          error: 'missing _id',
        });
        done();
      });
  });

  test('Should update an issue with no fields to update: PUT request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .send({ _id })
      .end(function (err, res) {
        assert.deepEqual(res.body, {
          error: 'no update field(s) sent',
          _id: res.body._id,
        });
        done();
      });
  });

  test('Should update an issue with an invalid _id: PUT request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .send({ _id: 'InvalidId' })
      .end(function (err, res) {
        assert.deepEqual(res.body, {
          error: 'no update field(s) sent',
          _id: res.body._id,
        });
        done();
      });
  });

  test('Should delete an issue: DELETE request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .delete('/api/issues/apitest')
      .send({ _id })
      .end(function (err, res) {
        assert.deepEqual(res.body, {
          result: 'successfully deleted',
          _id: res.body._id,
        });
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Should delete an issue with an invalid _id: DELETE request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .delete('/api/issues/apitest')
      .send({ _id: 'InvalidId' })
      .end(function (err, res) {
        assert.deepEqual(res.body, {
          error: 'could not delete',
          _id: res.body._id,
        });
        done();
      });
  });

  test('Should delete an issue with missing _id: DELETE request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .delete('/api/issues/apitest')
      .send({})
      .end(function (err, res) {
        assert.deepEqual(res.body, {
          error: 'missing _id',
        });
        done();
      });
  });
});
