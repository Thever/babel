"use strict";
//  下面这些定义的函数方法是用@babel/preset-env做语法转换形成的辅助函数
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// 这个例子不是用来运行的。a2.js是手动引入包后的代码，不是命令生成的。
var Person = /*#__PURE__*/function () {
  function Person() {
    _classCallCheck(this, Person);
  }

  _createClass(Person, [{
    key: "sayname",
    value: function sayname() {
      return 'name';
    }
  }]);

  return Person;
}();

var john = new Person();
console.log(john);
