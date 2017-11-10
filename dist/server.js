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

var _require2 = require('./authenticate'),
    authenticate = _require2.authenticate;

var connectMongo = require('./mongodb-connector');

var start = exports.start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var mongo, app, buildOptions, PORT;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return connectMongo();

          case 2:
            mongo = _context2.sent;
            app = express();

            buildOptions = function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
                var user;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return authenticate(req, mongo.Users);

                      case 2:
                        user = _context.sent;
                        return _context.abrupt('return', {
                          context: { mongo: mongo, user: user },
                          schema: schema
                        });

                      case 4:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function buildOptions(_x, _x2) {
                return _ref2.apply(this, arguments);
              };
            }();

            app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));

            app.use('/graphiql', graphiqlExpress({
              endpointURL: '/graphql',
              passHeader: '"Authorization": "bearer token-mike@rocketmail.com"'
            }));

            PORT = 4000;

            app.listen(PORT, function () {
              console.log('Hackernews GraphQL server running on port ' + PORT + '.');
            });

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();