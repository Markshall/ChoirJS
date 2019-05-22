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
    this.middleware = new Middleware();

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
      this.handleRequest(routeCheck, req, res);
    }
  }

  handleRequest(routeCheck, req, res) {
    /*
     * Run route middlewares.
     */
    this.middleware.run(req, res, this.route, routeCheck);
  }
}
