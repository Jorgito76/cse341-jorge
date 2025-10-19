const { MongoClient } = require('mongodb');

let client;
let db;

async function connect(uri) {
  if (db) return db;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db();
  return db;
}

function getDb() {
  if (!db) throw new Error('DB not initialized. Call connect() first.');
  return db;
}

module.exports = { connect, getDb };
