import Choir from '../index';

const port = 8080;
const choir = new Choir(port);

choir.files('directory/');

choir.core.on('start', () => {
  console.log(`ChoirJS started on port ${port}`);
});
