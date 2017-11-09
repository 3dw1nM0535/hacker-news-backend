const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

/**
 * Define Schema types
 */

 const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
  }

  type Query {
    allLinks: [Link!]!
  }

  type Mutation {
    createLink (url: String!, description: String!) : Link
  }
 
  `;

  //Generate executable Scheme from you typeDef
  module.exports = makeExecutableSchema({ typeDefs, resolvers });