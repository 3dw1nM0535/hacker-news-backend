'use strict';

var _require = require('graphql-tools'),
    makeExecutableSchema = _require.makeExecutableSchema;

var resolvers = require('./resolvers');

/**
 * Define Schema types
 */

var typeDefs = '\n  type Link {\n    id: ID!\n    url: String!\n    description: String!\n    postedBy: User\n    votes: [Vote!]!\n  }\n\n  type User {\n    id: ID!\n    name: String!\n    email: String!\n    votes: [Vote!]!\n  }\n\n  type Query {\n    allLinks: [Link!]!\n  }\n\n  type Mutation {\n    createLink (url: String!, description: String!) : Link \n\n    createVote(linkId: ID!) : Vote\n\n    # Note that this mutation could receive the email and password directly\n    # as arguments, with no problem. You\'re just using this "authProvider"\n    # instead to mimic the signature generated by Graphcool, which will\n    # make it easier to integrate this server implementation later with the \n    # code from the frontend tutorials.\n\n    createUser (name: String!, authProvider: AuthProviderSignUpData! ) : User\n\n    signinUser (email: AUTH_PROVIDER_EMAIL) : SigninPayload\n  }\n\n  type SigninPayload {\n    token: String!\n    user: User\n  }\n\n  type Vote {\n    id: ID!\n    user: User!\n    link: Link!\n  }\n\n  input AuthProviderSignUpData {\n    email: AUTH_PROVIDER_EMAIL\n  }\n\n  input AUTH_PROVIDER_EMAIL {\n    email: String!\n    password: String!\n  }\n \n  ';

//Generate executable Scheme from you typeDef
module.exports = makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });