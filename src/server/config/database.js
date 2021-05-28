const admin = require('firebase-admin')
const firebaseConfig = require('./firebase')
const key = require('../helpers/droptasks-firebase-adminsdk-akvrw-9a5bf29e9e.json')
// *Initialize
admin.initializeApp({ ...firebaseConfig, credential: admin.credential.cert(key) });

const db = admin.database();

module.export = db