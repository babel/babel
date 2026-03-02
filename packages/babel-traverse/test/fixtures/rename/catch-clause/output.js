let [a] = ["outside"];
try {} catch ({
  g = () => a
}) {
  let [z] = ["inside"];
}
