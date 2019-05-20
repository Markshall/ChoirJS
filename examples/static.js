import Choir from '../index';

const port = 8080;
const choir = new Choir(port);

/*
 * Serve static files in a directory.
 * Must start with a "/"
 * Directories must end in a "/"
 */
choir.files('/img/whatever.png');
choir.files('/css/');

choir.core.on('start', () => {
  console.log(`ChoirJS started on port ${port}`);
});
