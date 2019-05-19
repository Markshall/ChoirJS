import http from 'http';

import Events from 'events';

import Mixin from 'merge-descriptors';

import Route from './route';

import Response from './response';

import Header from './header';

export default class Choir {
  constructor(port) {
    this.core = new Events(); // Core Event
    this.route = new Route(); // Route Events

    const server = http.createServer(this.server.bind(this));
    server.listen(port, this.listen.bind(this));
  }

  listen() {
    this.core.emit('start');
  }

  server(req, res) {
    res.header = new Header();
    Mixin(res, Response(res)); // Merge NodeJS's http response with a few extra functions.

    switch (req.method) {
      case 'POST':
        this.route.post.emit(req.url, req, res);
        break;

      case 'GET':
        this.route.get.emit(req.url, req, res);
        break;

      default:
        res.writeHead(404);
        break;
    }
  }
}
