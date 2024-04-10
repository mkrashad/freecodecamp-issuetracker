let URLModel = require('../model/issueTracker');

const addIssue = (issueTitle, issueText, createdBy, assignedTo, statusText) => {
  const msg = new URLModel({
    issueTitle,
    issueText,
    createdBy,
    assignedTo,
    statusText,
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

// const getURL = (value) => {
//   const data = URLModel.find({ shortUrl: value }).exec();
//   return data;
// };

module.exports = { addIssue };
