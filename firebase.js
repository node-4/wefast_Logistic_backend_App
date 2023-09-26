const firebaseAdmin = require("firebase-admin");
const fs = require("fs");



const serviceAccount = fs.readFileSync(
  "./we-fast-79a50-firebase-adminsdk-lvq37-b2118a0541.json",
  {
    encoding: "utf-8",
  }
);
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(
    "./we-fast-79a50-firebase-adminsdk-lvq37-b2118a0541.json"
  ),
});

export { firebaseAdmin };
