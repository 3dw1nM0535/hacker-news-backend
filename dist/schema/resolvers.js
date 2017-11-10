'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('mongodb'),
    ObjectID = _require.ObjectID;

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
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
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
                return _context2.abrupt('return', Object.assign({ id: response.insertedIds[0] }, newUser));

              case 5:
              case 'end':
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

                return _context3.abrupt('return', { token: 'token-' + user.email, user: user });

              case 5:
              case 'end':
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
                return _context4.abrupt('return', Object.assign({ id: response.insertedIds[0] }, newLink));

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      function createLink(_x10, _x11, _x12) {
        return _ref8.apply(this, arguments);
      }

      return createLink;
    }(),

    createVote: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(root, data, _ref9) {
        var Votes = _ref9.mongo.Votes,
            user = _ref9.user;
        var newVote, response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                newVote = {
                  userId: user && user._id,
                  linkId: new ObjectID(data.linkId)
                };
                _context5.next = 3;
                return Votes.insert(newVote);

              case 3:
                response = _context5.sent;
                return _context5.abrupt('return', Object.assign({ id: response.insertedIds[0] }, newVote));

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, undefined);
      }));

      function createVote(_x13, _x14, _x15) {
        return _ref10.apply(this, arguments);
      }

      return createVote;
    }()
  },

  Vote: {
    id: function id(root) {
      return root._id || root.id;
    },

    user: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref11, data, _ref12) {
        var userId = _ref11.userId;
        var Users = _ref12.mongo.Users;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return Users.findOne({ _id: userId });

              case 2:
                return _context6.abrupt('return', _context6.sent);

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, undefined);
      }));

      function user(_x16, _x17, _x18) {
        return _ref13.apply(this, arguments);
      }

      return user;
    }(),

    link: function () {
      var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_ref14, data, _ref15) {
        var linkId = _ref14.linkId;
        var Links = _ref15.mongo.Links;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return Links.findOne({ _id: linkId });

              case 2:
                return _context7.abrupt('return', _context7.sent);

              case 3:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, undefined);
      }));

      function link(_x19, _x20, _x21) {
        return _ref16.apply(this, arguments);
      }

      return link;
    }()
  },

  User: {
    id: function id(root) {
      return root.id || root._id;
    },

    votes: function () {
      var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_ref17, data, _ref18) {
        var _id = _ref17._id;
        var Votes = _ref18.mongo.Votes;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return Votes.find({ userId: _id }).toArray();

              case 2:
                return _context8.abrupt('return', _context8.sent);

              case 3:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, undefined);
      }));

      function votes(_x22, _x23, _x24) {
        return _ref19.apply(this, arguments);
      }

      return votes;
    }()
  },

  Link: {
    id: function id(root) {
      return root._id || root.id;
    },

    postedBy: function () {
      var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_ref20, data, _ref21) {
        var postedById = _ref20.postedById;
        var Users = _ref21.mongo.Users;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return Users.findOne({ _id: postedById });

              case 2:
                return _context9.abrupt('return', _context9.sent);

              case 3:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, undefined);
      }));

      function postedBy(_x25, _x26, _x27) {
        return _ref22.apply(this, arguments);
      }

      return postedBy;
    }(),
    votes: function () {
      var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_ref23, data, _ref24) {
        var _id = _ref23._id;
        var Votes = _ref24.mongo.Votes;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return Votes.find({ linkId: _id }).toArray();

              case 2:
                return _context10.abrupt('return', _context10.sent);

              case 3:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, undefined);
      }));

      function votes(_x28, _x29, _x30) {
        return _ref25.apply(this, arguments);
      }

      return votes;
    }()
  }
};