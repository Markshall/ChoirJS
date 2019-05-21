"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _mime = _interopRequireDefault(require("mime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// https://www.npmjs.com/package/mime

/*
 * Serve static files in directories.
 * There might be a better way to do this. Feel free to update this.
 */
var Serve =
/*#__PURE__*/
function () {
  function Serve(directories, route, registry) {
    _classCallCheck(this, Serve);

    this.directories = directories;
    this.route = route;
    this.registry = registry;
    this.register();
  }

  _createClass(Serve, [{
    key: "register",
    value: function register() {
      for (var i = 0; i < this.directories.length; i += 1) {
        /*
         * Check if the entry is a directory or not via regex.
         * ^(.*)\/$
         */
        var name = null; // Name of the route;

        var regex = null;

        if (/^(.*)\/$/.test(this.directories[i])) {
          name = this.directories[i];
          regex = new RegExp("^(".concat(this.directories[i], ")((?!.*\\.\\.))"));
        } else {
          name = this.directories[i];
          regex = name;
        }

        this.registry.add(regex, name);
        this.route.get.on(name, function (req, res) {
          /*
           * Replace the first instance of "/" in req.url
           * so that fs won't think to look for file from root.
           */
          var file = req.url.replace('/', '');

          _fs["default"].readFile(file, function (err, data) {
            if (err) {
              res.notFound();
            } else {
              res.header.setHeader('Content-Type', _mime["default"].getType(file));
              res.send(data);
            }
          });
        });
      }
    }
  }]);

  return Serve;
}();

exports["default"] = Serve;
//# sourceMappingURL=serve.js.map