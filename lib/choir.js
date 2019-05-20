import http from 'http';

import Events from 'events';

import Mixin from 'merge-descriptors';

import Route from './route';

import Response from './response';

import Header from './header';

import Registry from './registry';

import Serve from './serve';

export default class Choir {
  constructor(port) {
    this.core = new Events(); // Core Event
    this.route = new Route(); // Route Events

    this.registry = new Registry();
    this.serve = [];

    const server = http.createServer(this.server.bind(this));
    server.listen(port, this.listen.bind(this));
  }

  listen() {
    const serve = new Serve(this.serve, this.route, this.registry);
    this.core.emit('start');
  }

  files(directory) {
    this.serve.push(directory);
  }

  server(req, res) {
    res.header = new Header();
    Mixin(res, Response(res)); // Merge NodeJS's http response with a few extra functions.
    /*
     * Run a check against the route registry.
     */
    const routeCheck = this.registry.check(req.url);
    if (routeCheck.error) {
      res.writeHead(404);
      res.write('Route not found in registry.');
      res.end();
    } else {
      req.params = routeCheck.exec;

      switch (req.method) {
        case 'POST':
          this.route.post.emit(routeCheck.route, req, res);
          break;

        case 'GET':
          this.route.get.emit(routeCheck.route, req, res);
          break;

        default:
          res.writeHead(404);
          break;
      }
    }
  }
}
