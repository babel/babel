import last from "lodash/last"

export default class Container {
  last(key) {
    if (!this.has(key)) {
      return;
    }

    return last(this.tokens.get(key))
  }
}
