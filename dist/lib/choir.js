"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _http = _interopRequireDefault(require("http"));

var _events = _interopRequireDefault(require("events"));

var _mergeDescriptors = _interopRequireDefault(require("merge-descriptors"));

var _route = _interopRequireDefault(require("./route"));

var _response = _interopRequireDefault(require("./response"));

var _header = _interopRequireDefault(require("./header"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Choir =
/*#__PURE__*/
function () {
  function Choir(port) {
    _classCallCheck(this, Choir);

    this.core = new _events["default"](); // Core Event

    this.route = new _route["default"](); // Route Events

    var server = _http["default"].createServer(this.server.bind(this));

    server.listen(port, this.listen.bind(this));
  }

  _createClass(Choir, [{
    key: "listen",
    value: function listen() {
      this.core.emit('start');
    }
  }, {
    key: "server",
    value: function server(req, res) {
      res.header = new _header["default"]();
      (0, _mergeDescriptors["default"])(res, (0, _response["default"])(res)); // Merge NodeJS's http response with a few extra functions.

      switch (req.method) {
        case 'POST':
          this.route.post.emit(req.url, req, res);
          break;

        case 'GET':
          this.route.get.emit(req.url, req, res);
          break;

        default:
          res.writeHead(404);
          break;
      }
    }
  }]);

  return Choir;
}();

exports["default"] = Choir;