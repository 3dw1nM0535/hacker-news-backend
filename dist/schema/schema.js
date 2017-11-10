'use strict';

var _require = require('graphql-tools'),
    makeExecutableSchema = _require.makeExecutableSchema;

var resolvers = require('./resolvers');

/**
 * Define Schema types
 */

var typeDefs = '\n  type Link {\n    id: ID!\n    url: String!\n    description: String!\n  }\n\n  type Query {\n    allLinks: [Link!]!\n  }\n\n  type Mutation {\n    createLink (url: String!, description: String!) : Link\n  }\n \n  ';

//Generate executable Scheme from you typeDef
module.exports = makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });