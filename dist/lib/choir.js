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

var _registry = _interopRequireDefault(require("./registry"));

var _serve = _interopRequireDefault(require("./serve"));

var _middleware = _interopRequireDefault(require("./middleware"));

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

    this.middleware = new _middleware["default"]();
    this.registry = new _registry["default"]();
    this.serve = [];
    this.globalMiddleware = [];
    this.template = {
      name: null,
      directory: null,
      callback: null
    };
    this.app = _http["default"].createServer(this.server.bind(this));
    this.app.listen(port, this.listen.bind(this));
  }

  _createClass(Choir, [{
    key: "listen",
    value: function listen() {
      var serve = new _serve["default"](this.serve, this.route, this.registry);
      this.core.emit('start');
    }
  }, {
    key: "files",
    value: function files(directory) {
      this.serve.push(directory);
    }
  }, {
    key: "engine",
    value: function engine(name, directory, callback) {
      this.template.name = name;
      this.template.directory = directory;
      this.template.callback = callback;
    }
  }, {
    key: "server",
    value: function server(req, res) {
      res.header = new _header["default"]();
      res.template = this.template; // Adding the template object to response.

      (0, _mergeDescriptors["default"])(res, (0, _response["default"])(res)); // Merge NodeJS's http response with a few extra functions.

      /*
       * Run a check against the route registry.
       */

      var routeCheck = this.registry.check(req.url);

      if (routeCheck.error) {
        res.notFound();
      } else {
        req.params = routeCheck.exec;
        this.handleRequest(routeCheck, req, res);
      }
    }
  }, {
    key: "handleRequest",
    value: function handleRequest(routeCheck, req, res) {
      /*
       * Run route middlewares.
       */
      this.middleware.run(req, res, this.route, routeCheck);
    }
  }]);

  return Choir;
}();

exports["default"] = Choir;
//# sourceMappingURL=choir.js.map