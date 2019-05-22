"use strict";

/*
 * Handle POST body data.
 * Output is not parsed.
 */
var allowedRequest = ['POST', 'PUT', 'DELETE', 'OPTIONS'];

function getData(req) {
  return new Promise(function (resolve, reject) {
    var buffer = '';
    req.on('data', function (data) {
      buffer += data;
    });
    req.on('end', function () {
      resolve(buffer);
    });
    req.on('error', function (err) {
      reject(err);
    });
  });
}

module.exports = function (req, res, next) {
  // console.log(req);
  // console.log('Hehe');
  req.body = null;

  if (req.headers['content-type'] === 'application/x-www-form-urlencoded' && allowedRequest.indexOf(req.method) !== -1) {
    getData(req).then(function (buffer) {
      req.body = buffer;
      next();
    })["catch"](function (err) {
      console.log(err);
      res.notFound(err);
    }); // next();
  } else {
    next();
  }
};
//# sourceMappingURL=body.js.map