import Choir from '../index';
import { ENETRESET } from 'constants';

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
 * Middleware
 * choir.register.add(<regex or path>, <name>, <middleware>)
 */
const userCheck = (req, res, next) => {
  if (req.params[0] === '0') {
    res.notFound('User does not exist');
  } else {
    next();
  }
};

const idCheck = (req, res, next) => {
  if (req.params[0] === '1') {
    res.notFound('Can\'t enter!');
  } else {
    next();
  }
};

choir.registry.add(/^\/user\/([0-9]*)$/, 'user', [userCheck, idCheck]);

choir.route.get.on('user', (req, res) => {
  // console.log(req.params);
  res.json({
    zero: req.params[0],
  });
});

choir.registry.add(/^\/profile\/([0-9]*)$/, 'profile', idCheck);

choir.route.get.on('profile', (req, res) => {
  // console.log(req.params);
  res.json({
    zero: req.params[0],
  });
});
