var choir = require('./dist/index');

/*
 * Export as a server for testing.
 */
module.exports = new choir(8080);