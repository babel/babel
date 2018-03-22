class RestParams {
  constructor(...rest) {
    this.rest = rest;
  }
  instanceMethod(...rest) {
    return rest;
  }
}

// ----------------------------------------------------------------------------

var obj = new RestParams(0, 1, 2);
expect(obj.rest).toEqual([0, 1, 2]);;
expect(obj.instanceMethod(3, 4, 5)).toEqual([3, 4, 5]);;

