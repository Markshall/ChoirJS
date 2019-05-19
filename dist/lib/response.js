"use strict";

module.exports = function (res) {
  var response = {
    head: function head() {
      res.writeHead(res.header.statusCode, res.header.headers);
    },

    /*
     * For sending ordinary data.
     */
    send: function send(val) {
      res.head();
      res.write(val);
      res.end();
    },

    /*
     * For sending formatted JSON data.
     */
    json: function json(val) {
      res.header.setHeader('Content-Type', 'application/json');
      res.head();
      res.write(JSON.stringify(val));
      res.end();
    }
  };
  return response;
};