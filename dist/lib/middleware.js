"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Middleware =
/*#__PURE__*/
function () {
  function Middleware() {
    _classCallCheck(this, Middleware);
  }

  _createClass(Middleware, null, [{
    key: "run",
    value: function run(wares, req, res) {
      var i = 0;

      if (wares.length > 0) {
        /*
         * next() will up the counter (i) and move on to next in the array.
         */
        var next = function next() {
          i += 1;

          if (i < wares.length) {
            wares[i](req, res, next);
          }
        };

        wares[i](req, res, next);
      }

      return i;
    }
  }]);

  return Middleware;
}();

exports["default"] = Middleware;
//# sourceMappingURL=middleware.js.map