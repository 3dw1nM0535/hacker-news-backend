const { MongoClient } = require('mongodb');

//db url
const MONGO_URI = 'mongodb://localhost:27017/hackernews';

module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URI);
  return {Links: db.collection('links')} ;
}

