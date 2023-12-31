const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = "TraineesDB";
let db = "";

async function dbconnection() {
    await client.connect(); // to connect to the MongoDB server
    console.log("DB connection established...");
    db = client.db(dbName); // to make the MongoDB databaes as the active database
    return db; // returning the db connection back to function call
}

// async function getDB() {
//     return db;
// }

module.exports = { dbconnection };