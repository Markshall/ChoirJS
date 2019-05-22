import Events from 'events';

export default class Route {
  constructor() {
    /*
     * Create event listeners for GET and POST requests.
     */
    this.get = new Events();
    this.post = new Events();
    this.put = new Events();
    this.delete = new Events();
    this.options = new Events();
  }
}
