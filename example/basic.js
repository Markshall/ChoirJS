import Choir from '../index';

const choir = new Choir(8080);

choir.core.on('start', () => {
  console.log('Choir started on port 8080.');
});

/*
 * Registering route to registry.
 * choir.registry.add(<regex or path>, <name>)
 */
choir.registry.add('/', 'index');

choir.route.get.on('index', (req, res) => {
  res.send('Test');
});

// POST with regex.
choir.registry.add(/^\/json([0-9])$/, 'json');

choir.route.post.on('json', (req, res) => {
  res.json({
    parameter: req.params[0],
  });
});
