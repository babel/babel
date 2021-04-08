var x = do {
  var bar = "foo";
  if (!bar) throw new Error(
    "unreachable"
  )
  bar;
};
