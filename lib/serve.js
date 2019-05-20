import fs from 'fs';

import mime from 'mime'; // https://www.npmjs.com/package/mime

/*
 * Serve static files in directories.
 * There might be a better way to do this. Feel free to update this.
 */
export default class Serve {
  constructor(directories, route, registry) {
    this.directories = directories;
    this.route = route;
    this.registry = registry;

    this.register();
  }

  register() {
    for (let i = 0; i < this.directories.length; i += 1) {
      /*
       * Check if the entry is a directory or not via regex.
       * ^(.*)\/$
       */
      let name = null; // Name of the route;
      let regex = null;
      if (/^(.*)\/$/.test(this.directories[i])) {
        name = this.directories[i];
        regex = new RegExp(`^(${this.directories[i]})((?!.*\\.\\.))`);
      } else {
        name = this.directories[i];
        regex = name;
      }

      this.registry.add(regex, name);
      this.route.get.on(name, (req, res) => {
        /*
         * Replace the first instance of "/" in req.url
         * so that fs won't think to look for file from root.
         */
        const file = req.url.replace('/', '');
        fs.readFile(file, (err, data) => {
          if (err) {
            res.notFound();
          } else {
            res.header.setHeader('Content-Type', mime.getType(file));
            res.send(data);
          }
        });
      });
    }
  }
}
