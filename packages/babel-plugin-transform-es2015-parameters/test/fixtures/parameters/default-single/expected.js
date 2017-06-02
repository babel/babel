function t(..._ref) {
  let [f = "foo"] = [..._ref];

  return f + " bar";
};