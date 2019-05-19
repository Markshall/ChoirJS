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
  };

  return response;
};
