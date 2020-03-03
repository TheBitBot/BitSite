module.exports = function() {
    
    var firebase = require("firebase-admin");

    var serviceAccount = require('../env/firebase.json')

    firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://bit-db.firebaseio.com"
    })

    const db = firebase.database()
    
    return db
}