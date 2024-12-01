const {firebase} = require("firebase/compat/app")
require("firebase/firestore")
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore")
require('dotenv').config()

const {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId} = process.env

const firebaseConfig = {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStoreDb = getFirestore(app);

module.exports = {app, fireStoreDb}