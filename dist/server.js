'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require('express');
var bodyParser = require('body-parser');

var _require = require('apollo-server-express'),
    graphqlExpress = _require.graphqlExpress,
    graphiqlExpress = _require.graphiqlExpress;

var schema = require('./schema/schema');

var connectMongo = require('./mongodb-connector');

var start = exports.start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var mongo, app, PORT;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return connectMongo();

          case 2:
            mongo = _context.sent;
            app = express();

            app.use('/graphql', bodyParser.json(), graphqlExpress({
              context: { mongo: mongo },
              schema: schema
            }));
            app.use('/graphiql', graphiqlExpress({
              endpointURL: '/graphql'
            }));

            PORT = 4000;

            app.listen(PORT, function () {
              console.log('Hackernews GraphQL server running on port ' + PORT + '.');
            });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();