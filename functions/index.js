const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.logError = functions.https.onRequest((req, res) => {
  const error = req.query.error;
  const currentTimeStamp = new Date().getTime();
  admin.database().ref('/errors').child(currentTimeStamp)
  .set(error)
  return res.sendStatus(200)
});

exports.logUser = functions.https.onRequest((req, res) => {
  const reqOS = req.query.os;
  const oldReqOS = req.params['0'];
  const currentTimeStamp = new Date().getTime();
  let OS = reqOS;
  if (oldReqOS !== '') {
    OS = oldReqOS.replace('/', '');
  }
  if (
    OS !== 'Windows' &&
    OS !== 'macOS' &&
    OS !== 'Linux' &&
    OS !== 'windows' &&
    OS !== 'osx' &&
    OS !== 'linux' &&
    OS !== 'Unknown'
  ) {
    OS = 'Unknown';
  }
  if (OS === 'osx') {
    OS = 'macOS';
  }
  admin.database().ref('/stats').child('lastUse').set(currentTimeStamp);
  admin.database().ref('/stats').child(`usage/${currentTimeStamp}`).set(OS.toLowerCase());
  return res.sendStatus(200)
});