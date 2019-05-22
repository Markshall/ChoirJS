import http from 'http';

import Events from 'events';

import Mixin from 'merge-descriptors';

import Route from './route';

import Response from './response';

import Header from './header';

import Registry from './registry';

import Serve from './serve';

import Middleware from './middleware';

export default class Choir {
  constructor(port) {
    this.core = new Events(); // Core Event
    this.route = new Route(); // Route Events

    this.registry = new Registry();
    this.serve = [];
    this.globalMiddleware = [];
    this.template = {
      name: null,
      directory: null,
      callback: null,
    };

    this.app = http.createServer(this.server.bind(this));
    this.app.listen(port, this.listen.bind(this));
  }

  listen() {
    const serve = new Serve(this.serve, this.route, this.registry);
    this.core.emit('start');
  }

  files(directory) {
    this.serve.push(directory);
  }

  /*
   * Global middleware.
   * middleware: accepts array or function.
   */
  middleware(middleware) {
    if (Array.isArray(middleware)) {
      this.globalMiddleware.concat(middleware);
    } else {
      this.globalMiddleware.push(middleware);
    }
  }

  engine(name, directory, callback) {
    this.template.name = name;
    this.template.directory = directory;
    this.template.callback = callback;
  }

  server(req, res) {
    res.header = new Header();
    res.template = this.template; // Adding the template object to response.
    Mixin(res, Response(res)); // Merge NodeJS's http response with a few extra functions.
    /*
     * Run a check against the route registry.
     */
    const routeCheck = this.registry.check(req.url);
    if (routeCheck.error) {
      res.notFound();
    } else {
      req.params = routeCheck.exec;
      if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        this.handleFormRequest(routeCheck, req, res);
      } else {
        req.body = null;
        this.handleRequest(routeCheck, req, res);
      }
    }
  }

  handleFormRequest(routeCheck, req, res) {
    let body = '';
    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      req.body = body;
      this.handleRequest(routeCheck, req, res);
    });
  }

  handleRequest(routeCheck, req, res) {
    /*
       * Run global middlewares first.
       */
    const globalMiddlewareCheck = Middleware.run(this.globalMiddleware, req, res);

    /*
     * Run route middlewares.
     */
    const routeMiddlewareCheck = (globalMiddlewareCheck === this.globalMiddleware.length)
      ? Middleware.run(routeCheck.middleware, req, res) : 0;

    /*
     * If all the middleware is ran, proceed to main course.
     */
    if (routeMiddlewareCheck === routeCheck.middleware.length) {
      switch (req.method) {
        case 'POST':
          this.route.post.emit(routeCheck.route, req, res);
          break;

        case 'GET':
          this.route.get.emit(routeCheck.route, req, res);
          break;

        case 'PUT':
          this.route.put.emit(routeCheck.route, req, res);
          break;

        case 'DELETE':
          this.route.delete.emit(routeCheck.route, req, res);
          break;

        case 'OPTIONS':
          this.route.options.emit(routeCheck.route, req, res);
          break;

        default:
          res.writeHead(404);
          break;
      }
    }
  }
}
