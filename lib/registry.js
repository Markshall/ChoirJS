export default class Registry {
  constructor() {
    this.routes = [];
  }

  add(regex, name) {
    this.routes.push({
      route: regex,
      name,
    });
  }

  check(url) {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (typeof this.routes[i].route.test === 'function') {
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
            exec,
          };
        }
      } else if (this.routes[i].route === url) {
        return {
          error: false,
          route: this.routes[i].name,
          exec: null,
        };
      }
    }
    return {
      error: true,
    };
  }
}
