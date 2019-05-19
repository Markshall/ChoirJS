"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Header =
/*#__PURE__*/
function () {
  function Header() {
    _classCallCheck(this, Header);

    /*
     * For more information on Satus Codes:
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
     */
    this.statusCode = 200; // Default is set to 200.

    this.headers = {};
    /*
     * Set default headers.
     */

    this.setHeader('Content-Type', 'text/html');
    this.setHeader('X-Powered-By', 'Choir');
  }

  _createClass(Header, [{
    key: "setStatus",
    value: function setStatus(code) {
      this.statusCode = code;
    }
  }, {
    key: "setHeader",
    value: function setHeader(type, value) {
      this.headers[type] = value;
    }
  }]);

  return Header;
}();

exports["default"] = Header;