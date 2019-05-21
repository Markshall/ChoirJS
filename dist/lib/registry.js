"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Registry =
/*#__PURE__*/
function () {
  function Registry() {
    _classCallCheck(this, Registry);

    this.routes = [];
  }

  _createClass(Registry, [{
    key: "add",
    value: function add(regex, name) {
      var middleware = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      this.routes.push({
        route: regex,
        name: name,
        middleware: Array.isArray(middleware) ? middleware : [middleware]
      });
    }
  }, {
    key: "check",
    value: function check(url) {
      for (var i = 0; i < this.routes.length; i += 1) {
        /*
         * Check if the route field is a regex or string.
         */
        // console.log(this.routes);
        if (typeof this.routes[i].route.test === 'function') {
          // console.log(url.replace('/', ''));
          if (this.routes[i].route.test(url)) {
            var exec = this.routes[i].route.exec(url);
            /*
             * Remove unnecessary parameters.
             */

            exec.splice(0, 1);
            delete exec.index;
            delete exec.input;
            delete exec.groups;
            return {
              error: false,
              route: this.routes[i].name,
              middleware: this.routes[i].middleware,
              exec: exec
            };
          }
        } else if (this.routes[i].route === url) {
          return {
            error: false,
            route: this.routes[i].name,
            middleware: this.routes[i].middleware,
            exec: null
          };
        }
      }

      return {
        error: true
      };
    }
  }]);

  return Registry;
}();

exports["default"] = Registry;
//# sourceMappingURL=registry.js.map