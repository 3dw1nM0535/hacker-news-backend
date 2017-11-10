const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./schema/schema');

const connectMongo = require('./mongodb-connector');

export const start = async () => {

  const mongo = await connectMongo();
  var app = express();
  app.use('/graphql', bodyParser.json(), graphqlExpress({
    context: { mongo },
    schema
  }));
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Hackernews GraphQL server running on port ${PORT}.`)
  });
};
