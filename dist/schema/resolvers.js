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
    //create User mutation
    createUser: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(root, data, _ref3) {
        var Users = _ref3.mongo.Users;
        var newUser, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                //convert given parameters into format users 
                //for the 'User' type. grabbing email and password from authProviders
                newUser = {
                  name: data.name,
                  email: data.authProvider.email.email,
                  password: data.authProvider.email.password
                };
                _context2.next = 3;
                return Users.insert(newUser);

              case 3:
                response = _context2.sent;
                return _context2.abrupt("return", Object.assign({ id: response.insertedIds[0] }, newUser));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      function createUser(_x4, _x5, _x6) {
        return _ref4.apply(this, arguments);
      }

      return createUser;
    }(),

    //sign in user mutation
    signinUser: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(root, data, _ref5) {
        var Users = _ref5.mongo.Users;
        var user;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return Users.findOne({ email: data.email.email });

              case 2:
                user = _context3.sent;

                if (!(data.email.password === user.password)) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", { token: "token-" + user.email, user: user });

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      function signinUser(_x7, _x8, _x9) {
        return _ref6.apply(this, arguments);
      }

      return signinUser;
    }(),

    createLink: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(root, data, _ref7) {
        var Links = _ref7.mongo.Links,
            user = _ref7.user;
        var newLink, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                newLink = Object.assign({ postedById: user && user._id }, data);
                _context4.next = 3;
                return Links.insert(newLink);

              case 3:
                response = _context4.sent;
                return _context4.abrupt("return", Object.assign({ id: response.insertedIds[0] }, newLink));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      function createLink(_x10, _x11, _x12) {
        return _ref8.apply(this, arguments);
      }

      return createLink;
    }()
  },

  User: {
    id: function id(root) {
      return root.id || root._id;
    }
  },

  Link: {
    id: function id(root) {
      return root._id || root.id;
    },

    postedBy: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref9, data, _ref10) {
        var postedById = _ref9.postedById;
        var Users = _ref10.mongo.Users;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return Users.findOne({ _id: postedById });

              case 2:
                return _context5.abrupt("return", _context5.sent);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, undefined);
      }));

      function postedBy(_x13, _x14, _x15) {
        return _ref11.apply(this, arguments);
      }

      return postedBy;
    }()
  }
};