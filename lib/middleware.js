export default class Middleware {
  static run(wares, req, res) {
    let i = 0;
    if (wares.length > 0) {
      /*
       * next() will up the counter (i) and move on to next in the array.
       */
      const next = () => {
        i += 1;
        if (i < wares.length) {
          wares[i](req, res, next);
        }
      };
      wares[i](req, res, next);
    }
    return i;
  }
}
