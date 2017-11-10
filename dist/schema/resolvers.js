"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = {
  Query: {
    allLinks: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(root, data, _ref) {
        var Links = _ref.mongo.Links;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Links.find({}).toArray();

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      function allLinks(_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return allLinks;
    }()
  },
  Mutation: {
    createLink: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(root, data, _ref3) {
        var Links = _ref3.mongo.Links;
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Links.insert(data);

              case 2:
                response = _context2.sent;
                return _context2.abrupt("return", Object.assign({ id: response.insertedIds[0] }, data));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      function createLink(_x4, _x5, _x6) {
        return _ref4.apply(this, arguments);
      }

      return createLink;
    }()
  },

  Link: {
    id: function id(root) {
      return root._id || root.id;
    }
  }
};