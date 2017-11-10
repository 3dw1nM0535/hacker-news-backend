const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./schema/schema');
const { authenticate } = require('./authenticate');

const connectMongo = require('./mongodb-connector');

export const start = async () => {

  const mongo = await connectMongo();
  var app = express();

  const buildOptions = async (req, res) => {
    const user = await authenticate(req, mongo.Users);
    return {
      context: { mongo, user },
      schema
    };
  };

  app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));
  
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    passHeader: `"Authorization": "bearer token-mike@rocketmail.com"`
  }));

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Hackernews GraphQL server running on port ${PORT}.`)
  });
};
