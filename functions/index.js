const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.logError = functions.https.onRequest((req, res) => {
  const error = req.query.error;
  const currentTimeStamp = new Date().getTime();
  admin.database().ref('/errors').child(currentTimeStamp)
  .set(error)
});

exports.logUser = functions.https.onRequest((req, res) => {
  const reqOS = req.query.os;
  const currentTimeStamp = new Date().getTime();
  let OS = reqOS;
  if (
    OS !== 'Windows' &&
    OS !== 'macOS' &&
    OS !== 'Linux' &&
    OS !== 'Unknown'
  ) {
    OS = 'Unknown';
  }
  admin.database().ref('/stats').child('lastUse').set(currentTimeStamp);
  admin.database().ref('/stats').child(`usage/${currentTimeStamp}`).set(OS);
});