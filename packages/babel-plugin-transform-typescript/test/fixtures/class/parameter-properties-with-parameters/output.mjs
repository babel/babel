export default class Example {
  constructor() {
    let arg1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    this.arg1 = arg1;
  }

}
