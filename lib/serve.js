import fs from 'fs';

import mime from 'mime';

/*
 * Serve static files in directories.
 * There might be a better way to do this. Feel free to update this.
 */
export default class Serve {
  constructor(directories, route, registry) {
    this.directories = directories;
    this.route = route;
    this.registry = registry;

    this.files = [];

    for (let i = 0; i < this.directories.length; i += 1) {
      const files = this.list(this.directories[i]);
      for (let f = 0; f < files.length; f += 1) {
        // console.log(files[f]);
        this.serve(files[f]);
      }
    }
  }

  list(directory, fileList) {
    const files = fs.readdirSync(directory);
    fileList = fileList || [];
    files.forEach((file) => {
      if(fs.statSync(`${directory}/${file}`).isDirectory()) {
        fileList = this.list(`${directory}/${file}/`, fileList);
      } else {
        fileList.push(`${directory}${file}`);
      }
    });

    return fileList;
  }

  serve(file) {
    this.registry.add(`/${file}`, `/${file}`);
    // console.log(this.registry.routes);
    this.route.get.on(`/${file}`, (req, res) => {
      // console.log(req.url);
      res.header.setHeader('Content-Type', mime.getType(req.url.replace('/', '')));
      res.head();
      res.write(fs.readFileSync(req.url.replace('/', '')));
      res.end();
    });
  }
}
