module.exports = (res) => {
  const response = {
    head: () => {
      res.writeHead(res.header.statusCode, res.header.headers);
    },
    /*
     * For sending ordinary data.
     */
    send: (val) => {
      res.head();
      res.write(val);
      res.end();
    },
    /*
     * For sending formatted JSON data.
     */
    json: (val) => {
      res.header.setHeader('Content-Type', 'application/json');
      res.head();
      res.write(JSON.stringify(val));
      res.end();
    },
    /*
     * 404 Error.
     */
    notFound: (message = null) => {
      res.header.setStatus(404);
      res.head();
      res.write((message !== null) ? message : 'Route not found in registry.');
      res.end();
    },
  };

  return response;
};
