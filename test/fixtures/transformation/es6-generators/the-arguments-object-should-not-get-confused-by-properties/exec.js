function *gen(obj) {
  yield obj.arguments;
  obj.arguments = "oyez";
  yield obj;
}

genHelpers.check(gen({ arguments: 42 }), [42, { arguments: "oyez" }]);
