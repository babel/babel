export default class Bundler {
  constructor(opts) {
    this.resolvers = [];
    this.cache     = {};
    this.opts      = opts;
  }

  addResolver(resolver) {
    this.resolvers.push(resolver);
  }

  transform() {

  }
}
