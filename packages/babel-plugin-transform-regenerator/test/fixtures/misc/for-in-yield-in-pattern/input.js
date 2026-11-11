function* gen(obj) {
  for (var [key = yield "default"] in obj) yield key;
}
