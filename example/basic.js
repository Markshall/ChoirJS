import Choir from '../index';

const choir = new Choir(8080);

choir.core.on('start', () => {
  console.log('Choir started on port 8080.');
});

/*
 * Receiving GET requests on /
 */
choir.route.get.on('/', (req, res) => {
  res.send('<h1>Holy cow</h1>');
});

/*
 * Receiving POST requests on /json
 */
choir.route.post.on('/json', (req, res) => {
  res.header.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    holy: 'cow',
  }));
});

/*
 * Receiving POST requests on /json1
 */
choir.route.post.on('/json1', (req, res) => {
  res.json({
    holy: 'cow',
    it: 'works',
  });
});
