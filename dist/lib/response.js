"use strict";

module.exports = function (res) {
  var response = {
    head: function head() {
      res.writeHead(res.header.statusCode, res.header.headers);
    },

    /*
     * Render from template.
     */
    render: function render(template, options) {
      res.template.callback("".concat(res.template.directory, "/").concat(template, ".").concat(res.template.name), options, function (err, render) {
        if (err) {
          res.notFound('Template file not found.');
        } else {
          res.send(render);
        }
      });
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
    },

    /*
     * 404 Error.
     */
    notFound: function notFound() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      res.header.setStatus(404);
      res.head();
      res.write(message !== null ? message : 'Route not found in registry.');
      res.end();
    }
  };
  return response;
};
//# sourceMappingURL=response.js.map