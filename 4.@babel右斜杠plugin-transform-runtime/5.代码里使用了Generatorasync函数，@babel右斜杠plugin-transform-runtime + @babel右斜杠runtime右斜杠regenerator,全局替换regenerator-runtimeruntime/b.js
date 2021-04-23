"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

//  写一个 async 函数
var p = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('a1');
  }, 1000);
});
var p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('a2');
  }, 2000);
});
var p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('a3');
  }, 3000);
});

function jojo() {
  return _jojo.apply(this, arguments);
}

function _jojo() {
  _jojo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var a, a2, a3;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return p;

          case 2:
            a = _context.sent;
            _context.next = 5;
            return p2;

          case 5:
            a2 = _context.sent;
            _context.next = 8;
            return p3;

          case 8:
            a3 = _context.sent;
            console.log(a + a2 + a3);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _jojo.apply(this, arguments);
}

jojo();
