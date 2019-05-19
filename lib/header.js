export default class Header {
  constructor() {
    /*
     * For more information on Satus Codes:
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
     */
    this.statusCode = 200; // Default is set to 200.
    this.headers = {};

    /*
     * Set default headers.
     */
    this.setHeader('Content-Type', 'text/html');
    this.setHeader('X-Powered-By', 'Choir');
  }

  setStatus(code) {
    this.statusCode = code;
  }

  setHeader(type, value) {
    this.headers[type] = value;
  }
}
