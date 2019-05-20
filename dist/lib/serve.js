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
    this.files = [];

    for (var i = 0; i < this.directories.length; i += 1) {
      var files = this.list(this.directories[i]);

      for (var f = 0; f < files.length; f += 1) {
        // console.log(files[f]);
        this.serve(files[f]);
      }
    }
  }

  _createClass(Serve, [{
    key: "list",
    value: function list(directory, fileList) {
      var _this = this;

      var files = _fs["default"].readdirSync(directory);

      fileList = fileList || [];
      files.forEach(function (file) {
        if (_fs["default"].statSync("".concat(directory, "/").concat(file)).isDirectory()) {
          fileList = _this.list("".concat(directory, "/").concat(file, "/"), fileList);
        } else {
          fileList.push("".concat(directory).concat(file));
        }
      });
      return fileList;
    }
  }, {
    key: "serve",
    value: function serve(file) {
      this.registry.add("/".concat(file), "/".concat(file)); // console.log(this.registry.routes);

      this.route.get.on("/".concat(file), function (req, res) {
        // console.log(req.url);
        res.header.setHeader('Content-Type', _mime["default"].getType(req.url.replace('/', '')));
        res.head();
        res.write(_fs["default"].readFileSync(req.url.replace('/', '')));
        res.end();
      });
    }
  }]);

  return Serve;
}();

exports["default"] = Serve;