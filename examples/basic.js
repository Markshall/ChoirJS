/*
 * Import Choir and Tools
 * Tools:
 *  - Body (For getting request body, will come out unparsed.)
 */
import { Choir, Tools } from '../index';

const port = 8080;
const choir = new Choir(port);

choir.core.on('start', () => {
  console.log(`ChoirJS started on port ${port}`);
});

choir.middleware.use(Tools.Body);

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

choir.route.post.on('json', (req, res) => {
  // console.log(req.params);
  res.json({
    zero: req.params[0],
    one: req.params[1],
    body: req.body, // Body is UNPARSED.
  });
});

choir.route.put.on('json', (req, res) => {
  // console.log(req.params);
  res.json({
    zero: req.params[0],
    one: req.params[1],
    request: 'PUT',
  });
});

choir.route.delete.on('json', (req, res) => {
  // console.log(req.params);
  res.json({
    zero: req.params[0],
    one: req.params[1],
    request: 'DELETE',
  });
});

choir.route.options.on('json', (req, res) => {
  // console.log(req.params);
  res.json({
    zero: req.params[0],
    one: req.params[1],
    request: 'OPTIONS',
  });
});
