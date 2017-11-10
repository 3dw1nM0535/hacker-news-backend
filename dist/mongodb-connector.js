'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('mongodb'),
    MongoClient = _require.MongoClient;

// 1


var MONGO_URL = 'mongodb://localhost:27017/hackernews';

// 2
module.exports = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var db;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return MongoClient.connect(MONGO_URL);

        case 2:
          db = _context.sent;
          return _context.abrupt('return', { Links: db.collection('links') });

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}));