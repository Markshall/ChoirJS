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

    this.middlewares = []; // this.event.on('end', () => console.log('End middleware called.'));
  }

  _createClass(Middleware, [{
    key: "use",
    value: function use(middleware) {
      if (Array.isArray(middleware)) {
        this.middlewares = this.middlewares.concat(middleware);
      } else {
        this.middlewares.push(middleware);
      }
    }
    /*
     * Don't fully know how this works, but hey, it works!
     */

  }, {
    key: "execute",
    value: function execute(middlewares, req, res, next) {
      var self = this;
      var composition = middlewares.reduceRight(function (next, fn) {
        return function (rq, rs) {
          // collect next data
          var request = req;
          var response = res;
          fn(request, response, next);
        };
      }, next);
      composition(req, res);
    }
  }, {
    key: "run",
    value: function run(request, response, route, routeCheck) {
      var _this = this;

      var middlewares = this.middlewares;
      /*
       * Merge middlewares with route.
       */

      if (Array.isArray(routeCheck.middleware)) {
        middlewares = middlewares.concat(routeCheck.middleware);
      } else {
        middlewares.push(routeCheck.middleware);
      }

      return this.execute(middlewares, request, response, function (req, res, next) {
        _this.runRoute(route, routeCheck, request, response);
      });
    }
  }, {
    key: "runRoute",
    value: function runRoute(route, routeCheck, req, res) {
      var self = this;

      switch (req.method) {
        case 'POST':
          route.post.emit(routeCheck.route, req, res);
          break;

        case 'GET':
          route.get.emit(routeCheck.route, req, res);
          break;

        case 'PUT':
          route.put.emit(routeCheck.route, req, res);
          break;

        case 'DELETE':
          route["delete"].emit(routeCheck.route, req, res);
          break;

        case 'OPTIONS':
          route.options.emit(routeCheck.route, req, res);
          break;

        default:
          res.writeHead(404);
          break;
      }
    }
  }]);

  return Middleware;
}();

exports["default"] = Middleware;
//# sourceMappingURL=middleware.js.map