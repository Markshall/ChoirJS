export default class Middleware {
  constructor() {
    this.middlewares = [];
    // this.event.on('end', () => console.log('End middleware called.'));
  }

  use(middleware) {
    if (Array.isArray(middleware)) {
      this.middlewares = this.middlewares.concat(middleware);
    } else {
      this.middlewares.push(middleware);
    }
  }

  /*
   * Don't fully know how this works, but hey, it works!
   */
  execute(middlewares, req, res, next) {
    const self = this;
    const composition = middlewares.reduceRight((next, fn) => (rq, rs) => {
      // collect next data
      const request = req;
      const response = res;
      fn(request, response, next);
    }, next);
    composition(req, res);
  }

  run(request, response, route, routeCheck) {
    let middlewares = this.middlewares;

    /*
     * Merge middlewares with route.
     */
    if (Array.isArray(routeCheck.middleware)) {
      middlewares = middlewares.concat(routeCheck.middleware);
    } else {
      middlewares.push(routeCheck.middleware);
    }

    return this.execute(middlewares, request, response, (req, res, next) => {
      this.runRoute(route, routeCheck, request, response);
    });
  }

  runRoute(route, routeCheck, req, res) {
    const self = this;

    const methods = ['post', 'get', 'put', 'delete', 'options'],
          method  = req.method.toLowerCase();

    methods.indexOf(method) > -1 ? route[method].emit(routeCheck.route, req, res) : res.writeHead(404);
  }
}
