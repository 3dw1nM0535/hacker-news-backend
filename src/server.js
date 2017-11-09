const express = require('express');

//parse JSON requests
var bodyParser = require('body-parser');

//package to handle GraphQL server requests and responses based on schema
const  { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const schema = require('./schema/schema');

var app = express(); //Instantiate express module

app.use('/graphql',
  bodyParser.json(), 
  graphqlExpress({ schema })
);

//GraphiQL IDE call
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Hacker news GraphQL server running on ${PORT}`);
});