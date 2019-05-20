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

/*
 * POST with REGEX
 * /json[0-9]/[a-zA-Z]*
 */
choir.registry.add(/^\/json([0-9])\/([a-zA-Z]*)$/, 'json');

choir.route.get.on('json', (req, res) => {
  // console.log(req.params);
  res.json({
    zero: req.params[0],
    one: req.params[1],
  });
});
