"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _events = _interopRequireDefault(require("events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Route = function Route() {
  _classCallCheck(this, Route);

  /*
   * Create event listeners for GET and POST requests.
   */
  this.get = new _events["default"]();
  this.post = new _events["default"]();
};

exports["default"] = Route;
//# sourceMappingURL=route.js.map