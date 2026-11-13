function* gen(obj, target) {
  for (target[yield "key"] in obj) yield target;
  for ((yield "object").key in obj);
}
