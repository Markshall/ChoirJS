export default class Registry {
  constructor() {
    this.routes = [];
  }

  add(regex, name, middleware = []) {
    this.routes.push({
      route: regex,
      name,
      middleware: (Array.isArray(middleware)) ? middleware : [middleware],
    });
  }

  check(url) {
    for (let i = 0; i < this.routes.length; i += 1) {
      /*
       * Check if the route field is a regex or string.
       */
      // console.log(this.routes);
      if (typeof this.routes[i].route.test === 'function') {
        // console.log(url.replace('/', ''));
        if (this.routes[i].route.test(url)) {
          const exec = this.routes[i].route.exec(url);
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
            exec,
          };
        }
      } else if (this.routes[i].route === url) {
        return {
          error: false,
          route: this.routes[i].name,
          middleware: this.routes[i].middleware,
          exec: null,
        };
      }
    }
    return {
      error: true,
    };
  }
}
