import Choir from '../index';

const port = 8080;
const choir = new Choir(port);

choir.core.on('start', () => {
  console.log(`ChoirJS started on port ${port}`);
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
