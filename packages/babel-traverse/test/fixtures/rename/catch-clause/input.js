let [a] = ["outside"];

try {} catch ({ g = () => a }) {
  let [a] = ["inside"];
}
