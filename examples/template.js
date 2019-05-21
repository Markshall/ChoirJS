import Choir from '../index';

import fs from 'fs';

/*
 * An example on how to develop a template engine.
 */

const port = 8080;
const choir = new Choir(port);

choir.core.on('start', () => {
  console.log(`ChoirJS started on port ${port}`);
});

/*
 * choir.engine(<name>, <views directory>, <engine callback>)
 * <engine callback>: (file_path, options, callback)
 */
choir.engine('tpl', './views', (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err, null);

    const render = content.toString()
      .replace('#header#', `<h1>${options.header}</h1>`);
    return callback(null, render);
  });
});

/*
 * Registering route to registry.
 * choir.registry.add(<regex or path>, <name>)
 */
choir.registry.add('/', 'index');

choir.route.get.on('index', (req, res) => {
  res.render('test', { header: 'An example of how to use the template engine.' });
});
